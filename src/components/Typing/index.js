import React from "react";
import { useStyles } from "./styles";
import cx from "classnames";

const Typing = ({variant}) => {
  const classes = useStyles();
  return (
    <span
      className={cx(classes.Typing, {
        [classes.Typing_secondary]: variant === "secondary",
      })}
    >
      <span />
      <span />
      <span />
      typing
    </span>
  );
};

export default Typing;
