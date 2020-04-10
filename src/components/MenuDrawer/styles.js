import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MenuDrawer: {
    position: "absolute",
    width: "95%",
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
    width: "100%",
    maxWidth: 960,
    zIndex: 1300,
    left: "auto",
    right: "auto",
  },
}));
