import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";

const useStyles = makeStyles(theme => ({
  userItem: {},
  userItemPrimary: {
    ...theme.props.classes.ellipsis
  },
  userItemSecondary: {
    ...theme.props.classes.ellipsis,
    color: theme.palette.secondary[200]
  }
}));

const UserItem = props => {
  const classes = useStyles();

  return (
    <ListItem dense button to={props.link} component={Link} className={classes.userItem}>
      <ListItemAvatar>
        <Avatar src={props.avatar} alt={props.name} />
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        primaryTypographyProps={{
          component: "div",
          className: classes.userItemPrimary
        }}
        secondary={`@${props.username}`}
        secondaryTypographyProps={{
          variant: "caption",
          component: "div",
          className: classes.userItemSecondary
        }}
      />
    </ListItem>
  );
};

export default UserItem;
