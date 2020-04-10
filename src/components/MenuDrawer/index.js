import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Slide,
  Backdrop,
} from "@material-ui/core";
import Avatar from "components/Avatar";
import {
  // Group as GroupIcon,
  Settings as SettingsIcon,
  // TouchApp as TouchAppIcon,
} from "@material-ui/icons";
import { useStyles } from "./styles";

export const menuSchema = [
  // {
  //   title: "New Group",
  //   link: "/create_team",
  //   action: ({ onToggle }) => onToggle,
  //   icon: <GroupIcon />,
  // },
  // {
  //   title: "New Channel",
  //   link: "/create_channel",
  //   action: ({ onToggle }) => onToggle,
  //   icon: <TouchAppIcon />,
  // },
  {
    title: "Settings",
    link: "/settings",
    action: ({ onToggle }) => onToggle,
    icon: <SettingsIcon />,
  },
];

const MenuDrawer = ({ open, user, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <Slide in={open} direction="right">
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
            <ListItem
              button
              className={classes.MenuDrawer_listItem}
              component="div"
              onClick={props.onLogout}
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
        onClick={props.onToggle}
        className={classes.MenuDrawer_backdrop}
      />
    </>
  );
};

export default React.memo(MenuDrawer);
