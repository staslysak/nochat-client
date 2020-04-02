import React from "react";
import { Typography } from "@material-ui/core";
import { useLazyQuery } from "@apollo/react-hooks";
import { DELETE_MESSAGE } from "graphql/queries/index";
import cx from "classnames";
import { formatDate } from "utils/index";
import MessageMenu from "./MessageMenu";
import { useStyles } from "./styles";

const Message = ({ id, isOwner, text, createdAt }) => {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleClose = () => setContextMenu(null);

  const handleOpen = e => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleDelete = () => deleteMessage({ variables: { id } });

  const [deleteMessage] = useLazyQuery(DELETE_MESSAGE);

  return (
    <div
      className={cx(classes.Message_content, {
        [classes.Message_content_sender]: isOwner,
        [classes.Message_content_receiver]: !isOwner
      })}
    >
      <div
        onContextMenu={handleOpen}
        className={cx(classes.Message, {
          [classes.Message_sender]: isOwner,
          [classes.Message_receiver]: !isOwner
        })}
      >
        <Typography variant="body2">{text}</Typography>
        <Typography variant="caption">{formatDate(createdAt)}</Typography>
      </div>
      <MessageMenu
        anchorEl={contextMenu}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Message;
