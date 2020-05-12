import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { isAuthorized } from "utils/index";
import {Loader} from 'components/Fallback'

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
    component: lazy(() => import("./pages/Home")),
  },
];

const publicRoutes = [
  {
    path: "/(login|registration)",
    exact: true,
    component: lazy(() => import("./pages/Login")),
  },
  {
    path: "/verify",
    exact: true,
    component: lazy(() => import("./pages/VerifyUser")),
  },
];

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default App;
