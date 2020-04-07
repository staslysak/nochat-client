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
import { CREATE_USER, LOGIN } from "graphql/mutations";
import { connect } from "react-redux";
import { dispatchLogin } from "redux/actions";
import { makeStyles } from "@material-ui/core/styles";

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
  const [state, setstate] = React.useState({ errors: {} });
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN);

  const handleOnChange = ({ target: { name, value } }) => {
    setstate({ ...state, [name]: value });
  };

  const handleErrors = (errors) => setstate({ ...state, errors });

  const handleData = async (data) => {
    if (/\/registration/.test(props.location.pathname)) {
      // props.history.push("/");
    } else {
      await props.dispatchLogin(data);
      props.history.push("/");
    }
    setstate({ ...state, errors: {} });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (/\/registration/.test(props.location.pathname)) {
      await createUser({ variables: state })
        .then(({ data }) => handleData(data.createUser))
        .then(() => alert("we have send an email"))
        .catch((error) => {
          const gqlError = error.graphQLErrors[0];
          if (gqlError) {
            handleErrors(gqlError.extensions.validationErrors);
          }
        });
    } else {
      await loginUser({ variables: state })
        .then(({ data }) => handleData(data.login))
        .catch((error) => {
          const gqlError = error.graphQLErrors[0];
          if (gqlError) {
            handleErrors(gqlError.extensions.validationErrors);
          }
        });
    }
  };

  const renderFields = () => {
    const { username, email, password, errors } = state;
    return (
      <div>
        <TextField
          margin="dense"
          variant="outlined"
          fullWidth
          onChange={handleOnChange}
          value={username}
          label="Username"
          name="username"
          error={errors.username}
          helperText={errors.username}
        />
        {/\/registration/.test(props.location.pathname) && (
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={handleOnChange}
            value={email}
            label="Email"
            name="email"
            error={errors.email}
            helperText={errors.email}
          />
        )}
        <TextField
          margin="dense"
          variant="outlined"
          fullWidth
          onChange={handleOnChange}
          value={password}
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
          {/\/registration/.test(props.location.pathname) ? "Join" : "Login"}
        </Typography>
        <form onSubmit={onSubmit}>
          {renderFields()}
          <Typography align="center" variant="body2" gutterBottom>
            {/\/registration/.test(props.location.pathname) ? (
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
            {/\/registration/.test(props.location.pathname) ? "Join" : "Login"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default connect(null, { dispatchLogin })(Login);
