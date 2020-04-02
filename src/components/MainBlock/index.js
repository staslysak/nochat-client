import React from "react";
import { Toolbar } from "@material-ui/core";
import { useStyles } from "./styles";

const MainBlock = ({ header, children, show = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.MainBlock}>
      {show && (
        <>
          <Toolbar className={classes.MainBlock_header}>{header}</Toolbar>
          <div className={classes.MainBlock_content}>{children}</div>
        </>
      )}
    </div>
  );
};

export default React.memo(MainBlock);
