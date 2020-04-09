import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import { useStyles } from "./styles";
import { formatDate } from "utils/index";
import Typing from "components/Typing";

const ChatItem = ({
  link,
  date,
  avatar,
  online,
  unread,
  typing = false,
  selected,
  primary,
  secondary,

  onContextMenu,
  ...props
}) => {
  const classes = useStyles();

  return (
    <ListItem
      dense
      button
      // disableRipple
      to={link}
      component={Link}
      selected={selected}
      onContextMenu={onContextMenu}
      {...props}
    >
      <ListItemAvatar>
        <Avatar src={avatar} alt={primary} online={online} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              variant="body2"
              className={classes.ChatItem_primaryText}
            >
              {primary}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDate(date)}
            </Typography>
          </>
        }
        primaryTypographyProps={{
          className: classes.ChatItem_primary,
          component: "div",
        }}
        secondary={
          <>
            <Typography
              variant="caption"
              className={classes.ChatItem_secondaryText}
            >
              {typing ? <Typing /> : secondary}
            </Typography>
            <Badge
              max={50}
              classes={{
                badge: classes.ChatItem_badge_badge,
                root: classes.ChatItem_badge_root,
              }}
              badgeContent={unread}
              color="secondary"
            />
          </>
        }
        secondaryTypographyProps={{
          className: classes.ChatItem_secondary,
          component: "div",
        }}
      />
    </ListItem>
  );
};

export default ChatItem;
