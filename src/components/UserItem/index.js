import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import { useStyles } from "./styles";

const UserItem = props => {
  const classes = useStyles();

  return (
    <ListItem dense button to={props.link} component={Link}>
      <ListItemAvatar>
        <Avatar src={props.avatar} alt={props.name} />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        primaryTypographyProps={{
          component: "div",
          className: classes.UserItem_primary
        }}
        secondary={`@${props.username}`}
        secondaryTypographyProps={{
          variant: "caption",
          component: "div",
          className: classes.UserItem_secondary
        }}
      />
    </ListItem>
  );
};

export default UserItem;
