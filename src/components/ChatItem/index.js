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
import ChatItemMenu from "./ChatItemMenu";
import { DELETE_DIRECT } from "graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

const ChatItem = ({
  user,
  link,
  unread,
  selected,
  lastMessage = {},
  ...props
}) => {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = React.useState(null);
  const [deleteDirect] = useMutation(DELETE_DIRECT);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleClose = () => setContextMenu(null);

  const handleDelete = () => deleteDirect({ variables: { id: props.chat.id } });

  return (
    <>
      <ListItem
        dense
        button
        // disableRipple
        to={link}
        component={Link}
        selected={selected}
        onContextMenu={handleOpen}
        // {...props}
      >
        <ListItemAvatar>
          <Avatar src={user.avatar} alt={user.username} online={user.online} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                variant="body2"
                className={classes.ChatItem_primaryText}
              >
                {user.username}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatDate(lastMessage.createdAt)}
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
                {lastMessage.text}
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
      <ChatItemMenu
        anchorEl={contextMenu}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ChatItem;
