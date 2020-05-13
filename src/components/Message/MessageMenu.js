import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const MessageMenu = ({ anchorEl, onClose, onDelete, onCopy }) => {
  const handleActions = (callback) => () => {
    callback();
    onClose();
  };

  return (
    <Menu
      // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem dense onClick={handleActions(onDelete)}>
        Delete Message
      </MenuItem>
      <MenuItem dense onClick={handleActions(onCopy)}>
        Copy Text
      </MenuItem>
    </Menu>
  );
};

export default MessageMenu;
