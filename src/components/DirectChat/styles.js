import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  DirectChat: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    // borderRight: `1px solid ${theme.palette.divider}`,
  },
  DirectChat_header: {
    minHeight: 64,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  DirectChat_header_status: {
    color: theme.palette.secondary[200],
  },
  DirectChat_content: {
    height: "100%",
    maxHeight: "calc(100% - 64px)",
    overflowY: "scroll",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  DirectChat_messageWrapper: {
    display: "flex",
    flexDirection: "column",
  },
}));
