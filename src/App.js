import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import Layout from "components/Layout";

const createLoadableComponent = pathResolver => {
  return Loadable({
    loader: pathResolver,
    loading: props => (props.error ? console.error(props.error) : null)
  });
};

const privatRoutes = [
  {
    path: "/",
    exact: false,
    component: createLoadableComponent(() => import("./pages/Home"))
  },
  {
    path: "/create_team",
    exact: true,
    component: createLoadableComponent(() => import("./pages/CreateTeam"))
  },
  {
    path: "/verify",
    exact: true,
    component: createLoadableComponent(() => import("./pages/VerifyUser"))
  }
];

const publicRoutes = [
  {
    path: "/(|registration)",
    exact: true,
    component: createLoadableComponent(() => import("./pages/Login"))
  },
  {
    path: "/verify",
    exact: true,
    component: createLoadableComponent(() => import("./pages/VerifyUser"))
  },
  { path: "*", component: Redirect }
];

const App = props => {
  return (
    <>
      <CssBaseline />
      {props.auth.isAuthorized ? (
        <Layout>
          {privatRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Layout>
      ) : (
        <Switch>
          {publicRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      )}
    </>
  );
};

export default connect(({ auth }) => ({ auth }))(App);
