import React from "react";
import { ListSubheader, List } from "@material-ui/core";
import { useStyles } from "./styles";

const StyledList = ({ subheader, ...props }) => {
  const classes = useStyles();

  return (
    <List
      {...props}
      subheader={
        subheader ? (
          <ListSubheader
            component="div"
            className={classes.StyledList_subheader}
          >
            {subheader}
          </ListSubheader>
        ) : null
      }
    />
  );
};

export default StyledList;
