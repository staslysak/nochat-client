import React from "react";
import Sidebar from "components/Sidebar";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    overflow: "hidden",
    padding: 0,
    maxHeight: "100vh"
  },
  sideBar: {
    position: "relative",
    width: "100%",
    maxWidth: theme.props.sidebar,
    minWidth: theme.props.sidebarMin
  },
  contentShift: {
    width: "100%",
    minWidth: theme.props.sidebarMin
  }
}));

const Layout = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.sideBar}>
        <Sidebar {...props} />
      </div>
      <div className={classes.contentShift}>{children}</div>
    </Container>
  );
};

export default withRouter(Layout);
