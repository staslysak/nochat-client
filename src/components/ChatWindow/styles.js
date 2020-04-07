import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  ChatWindow: {
    position: "relative",
    height: "100%",
    maxHeight: "calc(100% - 65px)",
    display: "flex",
    flexDirection: "column"
  },
  ChatWindow_input_wrapper: {
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderTop: `1px solid ${theme.palette.divider}`,
    "& .MuiInputBase-root": {
      fontSize: theme.typography.body2.fontSize
    }
  },
  ChatWindow_input: {
    minHeight: 64,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(
      0.5
    )}px ${theme.spacing(2)}px`,
    "& .MuiInputBase-inputMultiline": {
      "&::-webkit-scrollbar": { display: "none" }
    }
  },
  ChatWindow_empty: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ChatWindow_content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
    background: "transparent",
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: 5,
      background: "transparent",
      "&-thumb": {
        background:
          theme.palette.type === "dark"
            ? theme.lighten(theme.palette.background.default, 0.235)
            : theme.darken(theme.palette.background.default, 0.057),
        borderRadius: theme.shape.borderRadius * 3,
        display: "none"
      }
    },
    "&:hover::-webkit-scrollbar-thumb": { display: "block" }
  }
}));

export default useStyles;
