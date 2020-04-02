import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Slide,
  Backdrop
} from "@material-ui/core";
import Avatar from "components/Avatar";
import {
  Group as GroupIcon,
  Settings as SettingsIcon,
  TouchApp as TouchAppIcon
} from "@material-ui/icons";
import { useStyles } from "./styles";
import { USER } from "graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash-es";

export const menuSchema = [
  {
    title: "New Group",
    link: "/create_team",
    action: ({ onToggle }) => onToggle,
    icon: <GroupIcon />
  },
  {
    title: "New Channel",
    link: "/create_channel",
    action: ({ onToggle }) => onToggle,
    icon: <TouchAppIcon />
  },
  {
    title: "Settings",
    link: "/settings",
    action: ({ onToggle }) => onToggle,
    icon: <SettingsIcon />
  },
  {
    title: "Log Out",
    action: ({ onLogout }) => onLogout
  }
];

const MenuDrawer = ({ open, ...props }) => {
  const classes = useStyles();
  const userData = useQuery(USER);
  const user = get(userData, "data.user", {});

  return (
    <>
      <Slide in={open} direction="right">
        <div className={classes.MenuDrawer}>
          <List>
            <ListItem>
              <Avatar src={user.avatar} alt={user.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary={user.username} secondary={user.email} />
            </ListItem>
          </List>
          <List>
            {menuSchema.map(({ title, link, action, icon }) => (
              <ListItem
                key={title}
                button
                to={link}
                className={classes.MenuDrawer_listItem}
                component={link ? Link : "div"}
                onClick={action ? action(props) : undefined}
              >
                {icon}
                <Typography variant="body2" align={!!icon ? "left" : "center"}>
                  {title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Slide>
      <Backdrop
        open={open}
        onClick={props.onToggle}
        className={classes.MenuDrawer_backdrop}
      />
    </>
  );
};

export default MenuDrawer;
