import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER, LOGIN } from "graphql/mutations";
import { connect } from "react-redux";
import { dispatchLogin } from "redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import { wsLink } from "../../client";

const useStyles = makeStyles((theme) => ({
  Login: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [register] = useMutation(REGISTER);
  const [login] = useMutation(LOGIN);
  const isRegister = /\/registration/.test(props.location.pathname);

  const handleOnChange = ({ target: { name, value } }) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleData = async (data) => {
    if (isRegister) {
      props.history.push("/login");
    } else {
      await props.dispatchLogin(data);
      props.history.push("/me");
    }
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register({ variables: values })
        .then(({ data }) => handleData(data.register))
        .then(() => alert("Check your email"))
        .catch((error) => {
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((err) =>
              setErrors(err.extensions.validationErrors)
            );
          }
        });
    } else {
      await login({ variables: values })
        .then(({ data }) => {
          handleData(data.login);
          wsLink.subscriptionClient.tryReconnect();
        })
        .catch((error) => {
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((err) =>
              setErrors(err.extensions.validationErrors)
            );
          }
        });
    }
  };

  const renderFields = () => {
    return (
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
  };

  return (
    <div className={classes.Login}>
      <Box maxWidth={300}>
        <Typography variant="h6" gutterBottom>
          {isRegister ? "Join" : "Login"}
        </Typography>
        <form onSubmit={onSubmit}>
          {renderFields()}
          <Typography align="center" variant="body2" gutterBottom>
            {isRegister ? (
              <MuiLink align="center" component={Link} to="/">
                Already have an account?
              </MuiLink>
            ) : (
              <MuiLink align="center" component={Link} to="/registration">
                Not a member?
              </MuiLink>
            )}
          </Typography>
          <Button type="submit" fullWidth>
            {isRegister ? "Join" : "Login"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  dispatchLogin: (data) => dispatch(dispatchLogin(data)),
}))(Login);
