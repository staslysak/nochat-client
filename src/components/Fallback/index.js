import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import { useStyles } from "./styles";

export const DirectFallback = () => {
  const classes = useStyles();

  return (
    <div className={classes.DirectFallback}>
      <Typography variant="body2">No messages here yet...</Typography>
    </div>
  );
};

export const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.Loader}>
      <CircularProgress
        size={120}
        thickness={2}
        color='secondary'
      />
    </div>
  );
};
