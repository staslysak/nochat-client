import React from "react";
import { IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const Trigger = (props) => {
  return (
    <IconButton edge="start" color="inherit" {...props}>
      <MenuIcon />
    </IconButton>
  );
};

export default Trigger;
