import React from "react";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "components/Avatar";
import {
  Group as GroupIcon,
  Settings as SettingsIcon,
  TouchApp as TouchAppIcon
} from "@material-ui/icons";

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

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: "absolute",
    width: "95%",
    height: "100%",
    zIndex: theme.zIndex.tooltip,
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  listItem: {
    "& p": {
      width: "100%",
      marginLeft: theme.spacing(2)
    },
    "&:last-child p": {
      color: theme.palette.error.dark,
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      marginLeft: 0
    }
  }
}));

const MenuDrawer = props => {
  const classes = useStyles();

  return (
    <Slide in={props.open} direction="right">
      <div className={classes.drawerPaper}>
        <ListItem>
          <Avatar src={props.user.avatar} alt={props.user.username} />
        </ListItem>
        <ListItem>
          <div>
            <Typography variant="body2">{props.user.username}</Typography>
            <Typography variant="body2">{props.user.email}</Typography>
          </div>
        </ListItem>
        <List>
          {menuSchema.map(({ title, link, action, icon }) => (
            <ListItem
              key={title}
              button
              to={link}
              className={classes.listItem}
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
  );
};

export default MenuDrawer;
