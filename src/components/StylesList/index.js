import React from "react";
import { ListSubheader, List } from "@material-ui/core";
import { useStyles } from "./styles";

const StyledList = ({ subheader, visible = true, ...props }) => {
  const classes = useStyles();

  if (!visible) return null;

  return (
    <List
      {...props}
      subheader={
        subheader && (
          <ListSubheader
            component="div"
            className={classes.StyledList_subheader}
          >
            {subheader}
          </ListSubheader>
        )
      }
    />
  );
};

export default StyledList;
