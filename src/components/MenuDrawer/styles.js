import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MenuDrawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "calc(100% - 16px)",
    height: "100%",
    zIndex: theme.zIndex.tooltip,
    // background: theme.palette.background.paper,
    backgroundImage: `linear-gradient(90deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  MenuDrawer_listItem: {
    "& p": {
      width: "100%",
      marginLeft: theme.spacing(2),
    },
    "&:last-child p": {
      color: theme.palette.error.dark,
      marginLeft: 0,
    },
  },
  MenuDrawer_backdrop: {
    left: "auto",
    right: "auto",
    width: "100%",
    maxWidth: 960,
    zIndex: 1300,
    marginLeft: -24,
  },
}));
