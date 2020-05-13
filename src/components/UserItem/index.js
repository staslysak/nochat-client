import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import { useStyles } from "./styles";

const UserItem = ({ link, user, ...props }) => {
  const classes = useStyles();

  return (
    <ListItem {...props} dense button to={link} component={Link}>
      <ListItemAvatar>
        <Avatar src={user.avatar} alt={user.username} online={user.online} />
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        primaryTypographyProps={{
          component: "div",
          className: classes.UserItem_primary,
        }}
        secondary={`@${user.username}`}
        secondaryTypographyProps={{
          variant: "caption",
          component: "div",
          className: classes.UserItem_secondary,
        }}
      />
    </ListItem>
  );
};

export default UserItem;
