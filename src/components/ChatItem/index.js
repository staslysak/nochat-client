import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Badge
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";

const useStyles = makeStyles(theme => ({
  badge: {
    height: 15,
    "& .MuiBadge-badge": {
      position: "relative",
      transform: "none",
      height: "inherit"
    }
  },
  chatItem: {},
  chatItemPrimary: {
    display: "flex"
  },
  chatItemSecondary: {
    display: "flex",
    alignItems: "center"
  },
  chatItemPrimaryText: {
    width: "100%",
    ...theme.props.classes.ellipsis
  },
  chatItemSecondaryText: {
    width: "100%",
    marginRight: theme.spacing(1),
    ...theme.props.classes.ellipsis
  }
}));

const ChatItem = ({ link, selected, avatar, name, updatedAt, lastMessage, unreaded }) => {
  const classes = useStyles();

  return (
    <ListItem
      dense
      button
      to={link}
      component={Link}
      selected={selected}
      className={classes.chatItem}
    >
      <ListItemAvatar>
        <Avatar src={avatar} alt={name} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography variant="body2" className={classes.chatItemPrimaryText}>
              {name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {updatedAt}
            </Typography>
          </>
        }
        primaryTypographyProps={{
          className: classes.chatItemPrimary,
          component: "div"
        }}
        secondary={
          <>
            <Typography variant="caption" className={classes.chatItemSecondaryText}>
              {lastMessage}
            </Typography>
            <Badge className={classes.badge} badgeContent={unreaded} color="secondary" />
          </>
        }
        secondaryTypographyProps={{
          className: classes.chatItemSecondary,
          component: "div"
        }}
      />
    </ListItem>
  );
};

export default ChatItem;
