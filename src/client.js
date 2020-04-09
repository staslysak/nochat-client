import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { store } from "./redux/store";
import { dispatchLogout } from "redux/actions";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URI });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SOCKET_URI,
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      return {
        headers: {
          "x-token": token,
          "x-refresh-token": refreshToken,
        },
      };
    },
  },
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const token = headers.get("x-token");
    const refreshToken = headers.get("x-refresh-token");
    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response;
  })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken"),
    },
  }));

  return forward(operation);
});

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: 
          Message: ${message}, 
          Location: ${locations}, 
          Path: ${path}`
      );
      if (extensions.code === "UNAUTHENTICATED") {
        console.log(extensions.code, extensions.code === "UNAUTHENTICATED");
        store.dispatch(dispatchLogout());
      }
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLinkWithMiddleware = errorMiddleware.concat(
  afterwareLink.concat(authMiddleware.concat(httpLink))
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  // errorMiddleware,
  httpLinkWithMiddleware
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
