import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <SidebarContainer />
      <div className={classes.contentShift}>{props.children}</div>
    </Container>
  );
};

export default Layout;
