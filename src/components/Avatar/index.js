import React from "react";
import { Avatar as MuiAvarat, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import cx from "classnames";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const acronym = (str) =>
  str
    .split(" ")
    .map(([fl]) => fl)
    .join("");

const Avatar = ({ alt = "", src = "", online, ...props }) => {
  const classes = useStyles();
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  const isUrl = urlRegex.test(src);

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      invisible={!online}
    >
      <MuiAvarat
        src={isUrl ? src : undefined}
        // alt={alt}
        className={cx(classes.Avatar, {
          [classes[`Avatar_${props.size}`]]: props.size,
        })}
        style={!isUrl ? { background: src } : {}}
      >
        {acronym(alt)}
      </MuiAvarat>
    </StyledBadge>
  );
};

export default Avatar;
