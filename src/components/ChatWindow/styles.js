import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ChatWindow: {
    height: "100%",
    maxHeight: "calc(100% - 64px)",
  },
  ChatWindow_content: {
    height: "100%",
    overflow: "auto",
    padding: `${theme.spacing(3)}px`,
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
    paddingLeft: theme.spacing(2),
  },
  ChatWindow_input: {
    height: "100%",
    minHeight: 48,
    "& .MuiInputBase-inputMultiline": {
      "&::-webkit-scrollbar": { display: "none" },
    },
  },
}));

export default useStyles;
