import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  Sidebar: {
    position: "relative",
    width: "100%",
    maxWidth: theme.props.sidebar,
    minWidth: theme.props.sidebarMin
  },
  Sidebar_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  Sidebar_menuButton: {
    marginRight: theme.spacing(1)
  },
  Sidebar_searchbar: {
    background:
      theme.palette.type === "dark"
        ? theme.lighten(theme.palette.background.default, 0.235)
        : theme.darken(theme.palette.background.default, 0.057),
    padding: `0 ${theme.spacing(1)}px`,
    fontSize: theme.typography.body2.fontSize,
    boxSizing: "border-box",
    borderRadius: theme.shape.borderRadius
  }
}));
