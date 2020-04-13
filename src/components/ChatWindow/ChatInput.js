import React from "react";
import { InputBase, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "./styles";
import { withRouter } from "react-router-dom";

const ChatInput = (props) => {
  const classes = useStyles();
  const inputRef = React.useRef();
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setMessage("");
  }, [props.location]);

  const handleOnSubmit = () => {
    if (message.trim().length) {
      props.onSubmit(message);
    }

    setMessage("");
  };

  const handleOnClick = (inputRef) => () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    handleOnSubmit();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  };

  const handleOnChange = (e) => {
    props.onChange();
    setMessage(e.target.value);
  };

  return (
    <div className={classes.ChatWindow_input_wrapper}>
      <InputBase
        fullWidth
        multiline
        rowsMax={12}
        inputRef={inputRef}
        value={message}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
        placeholder="Write a message..."
        className={classes.ChatWindow_input}
      />
      <IconButton
        onClick={handleOnClick(inputRef)}
        disabled={!message.trim().length}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default withRouter(ChatInput);
