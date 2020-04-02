import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";

export const DirectFallback = () => {
  const classes = useStyles();

  return (
    <div className={classes.DirectFallback}>
      <Typography variant="body2">No messages here yet...</Typography>
    </div>
  );
};
