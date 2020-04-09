import React from "react";
import { ListSubheader, List } from "@material-ui/core";
import { useStyles } from "./styles";

const StyledList = (props) => {
  const classes = useStyles();

  return (
    <List
      {...props}
      subheader={
        props.subheader ? (
          <ListSubheader
            component="div"
            className={classes.StyledList_subheader}
          >
            {props.subheader}
          </ListSubheader>
        ) : null
      }
    />
  );
};

export default StyledList;
