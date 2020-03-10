import React from "react";
import { TextField } from "@material-ui/core";

const StyledInput = ({
  input,
  helperText,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    fullWidth
    variant="outlined"
    {...input}
    {...custom}
    helperText={error && touched ? error : null}
    error={touched && invalid}
  />
);

export default StyledInput;
