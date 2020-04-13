import React from "react";
import { Chip } from "@material-ui/core";
import { useStyles } from "./styles";

const StyledChip = (props) => {
  const classes = useStyles();
  return <Chip className={classes.StyledChip} size="small" {...props} />;
};

export default StyledChip;
