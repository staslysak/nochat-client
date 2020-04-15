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
import { isAuthorized } from "utils/index";

const createLoadableComponent = (pathResolver) => {
  return Loadable({
    loader: pathResolver,
    loading: (props) => {
      if (props.error) console.error(props.error);
      return null;
    },
  });
};

// const privatRoutes = [
//   {
//     path: "/",
//     exact: false,
//     component: createLoadableComponent(() => import("./pages/Home")),
//   },
//   {
//     path: "/verify",
//     exact: true,
//     component: createLoadableComponent(() => import("./pages/VerifyUser")),
//   },
// ];

const publicRoutes = [
  {
    path: "/me",
    exact: false,
    component: createLoadableComponent(() => import("./pages/Home")),
  },
  {
    path: "/(login|registration)",
    exact: true,
    component: createLoadableComponent(() => import("./pages/Login")),
  },
  {
    path: "/verify",
    exact: true,
    component: createLoadableComponent(() => import("./pages/VerifyUser")),
  },
  {
    path: "*",
    component: () => <Redirect to={isAuthorized() ? "/me" : "/login"} />,
  },
];

const App = (props) => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          {publicRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Router>
    </>
  );
};

export default connect(({ auth: { isAuthorized } }) => ({ isAuthorized }))(App);
