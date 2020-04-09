import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const DirectItemMenu = ({ anchorEl, onClose, onDelete }) => {
  const handleActions = (callback) => () => {
    callback();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem dense onClick={handleActions(onDelete)}>
        Delete chat
      </MenuItem>
    </Menu>
  );
};

export default DirectItemMenu;
