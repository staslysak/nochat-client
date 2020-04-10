import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Sidebar: {
    position: "relative",
    width: "100%",
    maxWidth: theme.props.sidebar,
    minWidth: theme.props.sidebarMin,
    // borderRight: `1px solid ${theme.palette.divider}`,
  },
  Sidebar_main: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background:
      theme.palette.type === "dark"
        ? theme.palette.action.selected
        : theme.palette.action.hover,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  Sidebar_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(3)}px`,
    minHeight: 64,
  },
  Sidebar_searchbar: {
    background: theme.palette.action.selected,
    padding: `0 ${theme.spacing(1)}px`,
    fontSize: theme.typography.body2.fontSize,
    minHeight: 32,
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  Sidebar_content: {
    height: "100%",
    maxHeight: "calc(100% - 64px)",
    overflowY: "scroll",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // borderTop: `1px solid ${theme.palette.divider}`
  },
}));
