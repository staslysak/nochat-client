import React from "react";
import { Avatar as MuiAvarat } from "@material-ui/core/";
import { useStyles } from "./styles";

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
      className={classes.Avatar}
      style={{ background: src }}
    >
      {name}
    </MuiAvarat>
  );
};

export default Avatar;
