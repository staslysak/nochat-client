import React from "react";
import { render } from "react-dom";
// import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "redux/store";
import { dispatchLogout } from "redux/actions";
import App from "./App";
import { theme } from "./theme";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, from } from "apollo-link";

// const client = new ApolloClient({
//   uri: "http://localhost:8081/graphql",
//   request: operation => {
//     const token = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refreshToken");
//     operation.setContext({
//       headers: {
//         "x-token": token,
//         "x-refresh-token": refreshToken
//       }
//     });
//   },
// });

const link = new HttpLink({ uri: process.env.REACT_APP_API_URI });

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;
    const refreshToken = headers.get("x-refresh-token");
    const token = headers.get("x-token");
    // if (headers) {
    if (token) {
      localStorage.setItem("token", token);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    // }

    return response;
  })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken")
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError, ...rest }) => {
      console.log(rest);
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: 
              Message: ${message}, 
              Location: ${locations}, 
              Path: ${path}`
          )
        );

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }

      store.dispatch(dispatchLogout());
    }),
    afterwareLink,
    authMiddleware,
    link
  ]),
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
