import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TEAM } from "graphql/mutations";
import { connect } from "react-redux";
import { dispatchLogin } from "redux/actions";

const CreateTeam = props => {
  const [state, setstate] = React.useState({ errors: {} });
  const [createTeam] = useMutation(CREATE_TEAM);

  const handleOnChange = ({ target: { name, value } }) =>
    setstate({ ...state, [name]: value });

  const handleErrors = errors => {
    setstate({ ...state, errors });
  };

  const handleData = async data => {
    console.log(data);
    // setstate({ errors: {} });
    // props.history.push("/");
  };

  const onSubmit = async e => {
    e.preventDefault();
    await createTeam({ variables: { name: state.name } })
      .then(({ data }) => handleData(data.createTeam))
      .catch(error => {
        console.log(error);
        const gqlError = error.graphQLErrors[0];
        if (gqlError) {
          handleErrors(gqlError.extensions.validationErrors);
        }
      });
  };

  const onClose = () => props.history.push("/");

  const renderFields = () => {
    const { name, errors } = state;
    return (
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        autoFocus
        onChange={handleOnChange}
        value={name}
        label="Team Name"
        name="name"
        error={errors.name}
        helperText={errors.name}
      />
    );
  };

  return (
    <Dialog open onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle id="alert-dialog-title">Create Team</DialogTitle>
        <DialogContent>{renderFields()}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Next</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default connect(({ auth }) => ({ auth }), { dispatchLogin })(CreateTeam);
