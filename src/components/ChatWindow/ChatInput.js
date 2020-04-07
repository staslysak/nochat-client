import React from "react";
import { InputBase, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "./styles";
import { withRouter } from "react-router-dom";

const ChatInput = (props) => {
  const classes = useStyles();
  const inputRef = React.createRef();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.location]);

  const handleOnClick = (inputRef) => async () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    props.onClick();
  };

  return (
    <div className={classes.ChatWindow_input_wrapper}>
      <InputBase
        fullWidth
        multiline
        rowsMax={5}
        inputRef={inputRef}
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        placeholder="Write a message..."
        className={classes.ChatWindow_input}
      />
      <IconButton
        onClick={handleOnClick(inputRef)}
        disabled={!props.value.trim().length}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default withRouter(ChatInput);
