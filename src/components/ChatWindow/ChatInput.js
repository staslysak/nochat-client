import React from "react";
import { InputBase, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "./styles";

const ChatInput = ({ onClick, ...inputProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.ChatWindow_input_wrapper}>
      <InputBase
        autoFocus
        fullWidth
        multiline
        rowsMax={5}
        {...inputProps}
        placeholder="Write a message..."
        className={classes.ChatWindow_input}
      />
      <IconButton onClick={onClick} disabled={!inputProps.value.trim().length}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatInput;
