import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import SidebarContainer from "containers/SidebarContainer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    overflow: "hidden",
    padding: 0,
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  contentShift: {
    width: "100%",
    background: theme.palette.background.paper,
    minWidth: theme.props.sidebarMin,
  },
}));

const Layout = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <SidebarContainer {...props} />
      <div className={classes.contentShift}>{children}</div>
    </Container>
  );
};

export default withRouter(Layout);
