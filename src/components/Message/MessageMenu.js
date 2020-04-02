import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const MessageMenu = ({ anchorEl, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem dense onClick={handleDelete}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default MessageMenu;
