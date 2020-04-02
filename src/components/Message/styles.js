import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  Message: {
    display: "flex",
    position: "relative",
    maxWidth: "70%",
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(
      0.5
    )}px`,
    borderRadius: theme.shape.borderRadius * 3,
    "&:before": {
      position: "absolute",
      bottom: -1,
      width: 15,
      height: 20,
      content: "''"
    },
    "& p": {
      alignSelf: "flex-end",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      paddingBottom: theme.spacing(2),
      minWidth: 20
    },
    "& span": {
      alignSelf: "flex-end",
      opacity: 0.54
    }
  },
  Message_content: {
    display: "flex",
    margin: `${theme.spacing(1)}px 0`
  },
  Message_content_receiver: {
    justifyContent: "flex-start"
  },
  Message_content_sender: {
    justifyContent: "flex-end"
  },
  Message_receiver: {
    background:
      theme.palette.type === "dark"
        ? theme.lighten(theme.palette.background.default, 0.235)
        : theme.darken(theme.palette.background.default, 0.057),
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
  Message_sender: {
    background: theme.palette.secondary.dark,
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    "&:before": {
      right: -10,
      transform: "rotate(15deg)",
      borderBottom: `15px solid ${theme.palette.secondary.dark}`,
      borderRight: "15px solid transparent"
    }
  }
}));
