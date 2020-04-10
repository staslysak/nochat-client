import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ChatWindow: {
    position: "relative",
    height: "100%",
    maxHeight: "calc(100% - 65px)",
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  ChatWindow_content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: 5,
      background: "transparent",
      "&-thumb": {
        background: theme.palette.action.selected,
        borderRadius: theme.shape.borderRadius * 3,
        display: "none",
      },
    },
    "&:hover::-webkit-scrollbar-thumb": { display: "block" },
  },
  ChatWindow_empty: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ChatWindow_input_wrapper: {
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& .MuiInputBase-root": {
      fontSize: theme.typography.body2.fontSize,
    },
  },
  ChatWindow_input: {
    height: "100%",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      0.5
    )}px ${theme.spacing(2)}px`,
    "& .MuiInputBase-inputMultiline": {
      "&::-webkit-scrollbar": { display: "none" },
    },
  },
}));

export default useStyles;
