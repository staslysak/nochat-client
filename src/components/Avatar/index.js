import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar as MuiAvarat } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  default: {
    fontSize: theme.typography.body1.fontSize,
    textTransform: "uppercase",
    color: theme.palette.common.white
  }
}));

const Avatar = ({ alt = "", src }) => {
  const classes = useStyles();
  const name = alt
    .split(" ")
    .map(x => x[0])
    .slice(0, 2)
    .join("");

  return (
    <MuiAvarat
      src={src}
      // alt={alt}
      className={classes.default}
      style={{ background: src }}
    >
      {name}
    </MuiAvarat>
  );
};

export default Avatar;
