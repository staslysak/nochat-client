import React from "react";
import { Drawer, Toolbar, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden"
  },
  drawerHeader: {
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary
  },
  drawerContent: {
    height: "100%",
    maxHeight: "calc(100% - 64px)",
    overflowY: "scroll",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  searchbar: {
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

const MainBlock = ({ header, searchbarProps, children, ...props }) => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} {...props}>
      <div className={classes.drawerHeader}>
        <Toolbar>
          {header}
          {searchbarProps && (
            <div>
              <InputBase size="small" className={classes.searchbar} {...searchbarProps} />
            </div>
          )}
        </Toolbar>
      </div>
      <div className={classes.drawerContent}>{children}</div>
    </Drawer>
  );
};

export default MainBlock;
