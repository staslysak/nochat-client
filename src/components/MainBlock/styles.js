import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  MainBlock: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  MainBlock_header: {
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary
  },
  MainBlock_content: {
    height: "100%",
    maxHeight: "calc(100% - 64px)",
    overflowY: "scroll",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));
