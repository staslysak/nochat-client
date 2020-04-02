import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Badge
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import { useStyles } from "./styles";

const ChatItem = ({
  link,
  selected,
  avatar,
  name,
  updatedAt,
  lastMessage,
  unread,
  ...props
}) => {
  const classes = useStyles();

  return (
    <ListItem
      dense
      button
      disableRipple
      to={link}
      component={Link}
      selected={selected}
      {...props}
    >
      <ListItemAvatar>
        <Avatar src={avatar} alt={name} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              variant="body2"
              className={classes.ChatItem_primaryText}
            >
              {name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {updatedAt}
            </Typography>
          </>
        }
        primaryTypographyProps={{
          className: classes.ChatItem_primary,
          component: "div"
        }}
        secondary={
          <>
            <Typography
              variant="caption"
              className={classes.ChatItem_secondaryText}
            >
              {lastMessage}
            </Typography>
            <Badge
              className={classes.ChatItem_badge}
              badgeContent={unread}
              color="secondary"
            />
          </>
        }
        secondaryTypographyProps={{
          className: classes.ChatItem_secondary,
          component: "div"
        }}
      />
    </ListItem>
  );
};

export default ChatItem;
