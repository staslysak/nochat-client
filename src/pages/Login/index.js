import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import { useLoginMutation, useRegisterMutation } from "graphql/generated.tsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { authTokens } from "utils/index";
import { useDispatch, dispatchSetUser } from "store";

const useStyles = makeStyles((theme) => ({
  Login: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  LoginForm: `
    max-width: 300px;
  `,
}));

const Login = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isRegister = /\/registration/.test(location.pathname);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const onComplete = ({ data }) => {
    if (isRegister) {
      alert("Check your email");
      history.push("/login");
    } else {
      dispatch(dispatchSetUser({}));
      authTokens.set(data.login);
      history.push("/me");
    }
    setErrors({});
  };

  const onError = (error) => {
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((err) =>
        setErrors(err.extensions.validationErrors)
      );
    }
  };

  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const handleOnChange = ({ target: { name, value } }) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerUser({ variables: values }).then(onComplete).catch(onError);
    } else {
      loginUser({ variables: values }).then(onComplete).catch(onError);
    }
  };

  const renderFields = () => (
    <div>
      <TextField
        fullWidth
        margin="dense"
        variant="outlined"
        onChange={handleOnChange}
        value={values.username}
        label="Username"
        name="username"
        error={errors.username}
        helperText={errors.username}
      />
      {isRegister && (
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          onChange={handleOnChange}
          value={values.email}
          label="Email"
          name="email"
          error={errors.email}
          helperText={errors.email}
        />
      )}
      <TextField
        fullWidth
        margin="dense"
        variant="outlined"
        onChange={handleOnChange}
        value={values.password}
        label="Password"
        name="password"
        type="password"
        error={errors.password}
        helperText={errors.password}
      />
    </div>
  );

  return (
    <div className={classes.Login}>
      <div className={classes.LoginForm}>
        <Typography variant="h6" gutterBottom>
          {isRegister ? "Join" : "Login"}
        </Typography>
        <form onSubmit={onSubmit}>
          {renderFields()}
          <Typography align="center" variant="body2" gutterBottom>
            <MuiLink
              align="center"
              component={Link}
              to={isRegister ? "/login" : "/registration"}
            >
              {isRegister ? "Already have an account" : "Not a member"}
            </MuiLink>
          </Typography>
          <Button type="submit" fullWidth>
            {isRegister ? "Join" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
