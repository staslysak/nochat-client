import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { authTokens } from "utils/index";
import { RefreshTokensDocument } from "graphql/generated.tsx";
import { store, dispatchSetUser } from "store";

const refreshTokens = async () =>
  await client
    .query({
      query: RefreshTokensDocument,
      fetchPolicy: "no-cache",
      variables: { refreshToken: authTokens.get("refreshToken") },
    })
    .then(({ data }) => {
      authTokens.set(data.tokens);
      return data.tokens;
    });

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URI}/graphql`,
});

export const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_SOCKET_URI}/graphql`,
  options: {
    reconnect: !!authTokens.get("refreshToken"),
    connectionCallback() {
      console.log("CONNECTION_TOKEN", authTokens.get("accessToken"));
    },
    connectionParams: () => ({
      authorization: authTokens.get("accessToken"),
    }),
  },
});

export const getRefreshedTokens = async (operation, forward) => {
  await refreshTokens().then(({ accessToken }) => {
    console.log("ACCESS_TOKEN", accessToken);
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: accessToken,
      },
    }));

    wsLink.subscriptionClient.tryReconnect();

    forward(operation).subscribe({
      next: ({ data }) => {
        if (operation.operationName === "self") {
          client.query({ ...operation, data }).then(({ data }) => {
            store.dispatch(dispatchSetUser(data["self"]));
          });
        } else {
          client.query({ ...operation, data });
        }
      },
    });
  });
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: authTokens.get("accessToken"),
    },
  }));

  return forward(operation);
});

const errorMiddleware = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(async ({ message, path, extensions }) => {
        if (extensions.code === "UNAUTHENTICATED") {
          getRefreshedTokens(operation, forward);
        }

        if (extensions.code === "INTERNAL_SERVER_ERROR") {
          authTokens.remove();
        }

        console.log(
          `[GraphQL ERROR]:
          CODE: ${extensions.code},
          Message: ${message},
          Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(ApolloLink.from([errorMiddleware, httpLink]))
  ),
});
