import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Loadable from "react-loadable";
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuthorized() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

const privateRoutes = [
  {
    path: "/me",
    exact: false,
    component: createLoadableComponent(() => import("./pages/Home")),
  },
];

const publicRoutes = [
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
];

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          {privateRoutes.map((route) => (
            <PrivateRoute key={route.path} {...route} />
          ))}
          {publicRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route
            path="*"
            render={() => <Redirect to={isAuthorized() ? "/me" : "/login"} />}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
