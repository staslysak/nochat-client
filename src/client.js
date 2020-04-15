import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { authTokens } from "utils/index";

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URI}/graphql`,
});

export const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_SOCKET_URI}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => {
      const { token, refreshToken } = authTokens.get();
      // console.log("connectionParams token", token);
      // console.log("connectionParams refreshToken", refreshToken);
      return {
        "x-token": token,
        "x-refresh-token": refreshToken,
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
      authTokens.set({ token, refreshToken });
    }

    return response;
  })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const { token, refreshToken } = authTokens.get();
    return {
      headers: {
        ...headers,
        "x-token": token,
        "x-refresh-token": refreshToken,
      },
    };
  });

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
      if (
        ["UNAUTHENTICATED", "INTERNAL_SERVER_ERROR"].includes(extensions.code) // "INTERNAL_SERVER_ERROR"
      ) {
        // authTokens.remove()
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
