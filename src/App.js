import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import Layout from "components/Layout";

const createLoadableComponent = (pathResolver) => {
  return Loadable({
    loader: pathResolver,
    loading: (props) => {
      if (props.error) console.error(props.error);
      return null;
    },
  });
};

const privatRoutes = [
  {
    path: "/",
    exact: false,
    component: createLoadableComponent(() => import("./pages/Home")),
  },
  {
    path: "/verify",
    exact: true,
    component: createLoadableComponent(() => import("./pages/VerifyUser")),
  },
];

const publicRoutes = [
  {
    path: "/(|registration)",
    exact: true,
    component: createLoadableComponent(() => import("./pages/Login")),
  },
  {
    path: "/verify",
    exact: true,
    component: createLoadableComponent(() => import("./pages/VerifyUser")),
  },
  { path: "*", component: Redirect },
];

const App = (props) => {
  return (
    <>
      <CssBaseline />
      <Router>
        {props.isAuthorized ? (
          <Layout>
            {privatRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Layout>
        ) : (
          <Switch>
            {publicRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        )}
      </Router>
    </>
  );
};

export default connect(({ auth }) => ({ isAuthorized: auth.isAuthorized }))(
  App
);
