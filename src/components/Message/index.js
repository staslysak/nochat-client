import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";
import { formatDate } from "utils/index";

const useStyles = makeStyles(theme => ({
  receiver: {
    background:
      theme.palette.type === "dark"
        ? theme.lighten(theme.palette.background.default, 0.235)
        : theme.darken(theme.palette.background.default, 0.057),
    alignSelf: "flex-start",
    "&:before": {
      left: -10,
      transform: "rotate(-15deg)",
      borderBottom: `15px solid ${
        theme.palette.type === "dark"
          ? theme.lighten(theme.palette.background.default, 0.235)
          : theme.darken(theme.palette.background.default, 0.057)
      }`,
      borderLeft: "15px solid transparent"
    }
  },
  sender: {
    background: theme.palette.secondary.dark,
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    alignSelf: "flex-end",
    "&:before": {
      right: -10,
      transform: "rotate(15deg)",
      borderBottom: `15px solid ${theme.palette.secondary.dark}`,
      borderRight: "15px solid transparent"
    }
  },
  default: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
    position: "relative",
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(0.5)}px`,
    borderRadius: theme.shape.borderRadius * 3,
    margin: `${theme.spacing(1)}px 0`,
    "&:before": {
      position: "absolute",
      bottom: -1,
      width: 15,
      height: 20,
      content: "''"
    },
    "& p": {
      wordWrap: "break-word",
      overflowWrap: "break-word",
      minWidth: 20,
      marginRight: theme.spacing(8)
    },
    "& span": {
      alignSelf: "flex-end",
      opacity: 0.54
    }
  }
}));

const Message = ({ variant, text, createdAt, ...props }) => {
  const classes = useStyles();

  return (
    <div
      className={cx(classes.default, {
        [classes[variant]]: true
      })}
    >
      <Typography variant="body2">{text}</Typography>
      <Typography variant="caption">{formatDate(createdAt)}</Typography>
    </div>
  );
};

export default Message;
