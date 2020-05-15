import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "./client";
import { ThemeProvider, StylesProvider } from "@material-ui/core";
import { theme, jss } from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </StylesProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
