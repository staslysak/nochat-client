import React, { useState } from "react";
import { Typography } from "@material-ui/core"; // Link
import { formatDate } from "utils/index";
import MessageMenu from "./MessageMenu";
import { useStyles } from "./styles";
import cx from "classnames";

const Message = ({ text, date, isOwner, menuProps }) => {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = useState(null);

  const handleClose = () => setContextMenu(null);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={cx(classes.Message_content, {
        [classes.Message_content_sender]: isOwner,
        [classes.Message_content_receiver]: !isOwner,
      })}
    >
      <div
        onContextMenu={handleOpen}
        className={cx(classes.Message, {
          [classes.Message_sender]: isOwner,
          [classes.Message_receiver]: !isOwner,
        })}
      >
        <Typography variant="body2">
          {text}
          {/* <Link href="#" color="inherit" underline="always">
            some@gmail.com
          </Link> */}
        </Typography>
        <Typography variant="caption">{formatDate(date)}</Typography>
      </div>
      <MessageMenu
        anchorEl={contextMenu}
        onClose={handleClose}
        {...menuProps}
        onCopy={handleCopyMessage}
      />
    </div>
  );
};

export default Message;
