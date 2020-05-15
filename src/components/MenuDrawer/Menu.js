import React from "react";
import {
  List,
  Slide,
  ListItem,
  Backdrop,
  Typography,
  ListItemText,
} from "@material-ui/core";
import Avatar from "components/Avatar";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { useStyles } from "./styles";

export const menuSchema = [
  {
    title: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

const Menu = ({ user, open, onClose, onLogout }) => {
  const classes = useStyles();

  return (
    <>
      <Slide in={open} direction="right" unmountOnExit mountOnEnter>
        <div className={classes.MenuDrawer}>
          <List>
            <ListItem>
              <Avatar
                src={user.avatar}
                alt={user.username}
                online={user.online}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={user.username} secondary={user.email} />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              className={classes.MenuDrawer_listItem}
              component="div"
              onClick={onLogout}
            >
              <Typography variant="body2" align="center">
                Log Out
              </Typography>
            </ListItem>
          </List>
        </div>
      </Slide>
      <Backdrop
        open={open}
        onClick={onClose}
        className={classes.MenuDrawer_backdrop}
      />
    </>
  );
};

export default Menu;
