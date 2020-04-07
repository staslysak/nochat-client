import React from "react";
import { Typography, Link } from "@material-ui/core";
import cx from "classnames";
import { formatDate } from "utils/index";
import MessageMenu from "./MessageMenu";
import { useStyles } from "./styles";

const Message = (props) => {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleClose = () => setContextMenu(null);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(props.text);
  };

  return (
    <div
      className={cx(classes.Message_content, {
        [classes.Message_content_sender]: props.isOwner,
        [classes.Message_content_receiver]: !props.isOwner,
      })}
    >
      <div
        onContextMenu={handleOpen}
        className={cx(classes.Message, {
          [classes.Message_sender]: props.isOwner,
          [classes.Message_receiver]: !props.isOwner,
        })}
      >
        <Typography variant="body2">
          {props.text}
          {/* <Link href="#" color="inherit" underline="always">
            some@gmail.com
          </Link> */}
        </Typography>
        <Typography variant="caption">{formatDate(props.date)}</Typography>
      </div>
      <MessageMenu
        anchorEl={contextMenu}
        onClose={handleClose}
        {...props.menuProps}
        onCopy={handleCopyMessage}
      />
    </div>
  );
};

export default Message;
