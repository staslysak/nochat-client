import React, { useRef, useState, useEffect } from "react";
import { InputBase, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "./styles";
import { useLocation } from "react-router-dom";
import { useTypeMessageMutation } from "graphql/generated.tsx";
import { useDebouncedCallback as useDebounce } from "use-debounce";

const ChatInput = ({ chatId, username, ...props }) => {
  const location = useLocation();
  const classes = useStyles();
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [typeMessage] = useTypeMessageMutation();

  const handleStopTyping = () => {
    typeMessage({ variables: { chatId, username: "" } }).then(() =>
      setTyping(false)
    );
  };

  const [debounceTyping] = useDebounce(handleStopTyping, 500);

  const handleKeyDown = () => {
    if (!typing && chatId) {
      setTyping(true);
      typeMessage({ variables: { chatId, username } });
    }
  };

  const handleKeyUp = () => {
    if (chatId) debounceTyping();
  };

  useEffect(() => {
    if (ref.current) ref.current.focus();

    setMessage("");
  }, [location]);

  const handleOnSubmit = () => {
    if (message.trim().length) {
      props.onSubmit(message);
    }

    setMessage("");
  };

  const handleOnClick = () => {
    if (ref.current) ref.current.focus();
    handleOnSubmit();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={classes.ChatWindow_input_wrapper}>
      <InputBase
        fullWidth
        multiline
        ref={ref}
        rowsMax={12}
        value={message}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
        placeholder="Write a message..."
        className={classes.ChatWindow_input}
      />
      <IconButton onClick={handleOnClick} disabled={!message.trim().length}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default React.memo(ChatInput);
