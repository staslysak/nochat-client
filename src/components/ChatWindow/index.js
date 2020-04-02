import React from "react";
import useStyles from "./styles";
import ChatInput from "./ChatInput";

const ChatWindow = ({
  chatId,
  children,
  onSendMessage,
  subscribeToNewMessage
}) => {
  const classes = useStyles();
  const containerRef = React.createRef();
  const [message, setMessage] = React.useState("");

  const handleViewUpdate = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [containerRef]);

  React.useEffect(() => {
    let unsubsribe = () => {};

    if (chatId) {
      unsubsribe = subscribeToNewMessage(chatId);
    }

    return () => {
      unsubsribe(chatId);
    };
  }, [chatId]);

  React.useEffect(() => {
    handleViewUpdate();
  }, [containerRef, handleViewUpdate]);

  const handleSendMessage = () => {
    if (message.trim().length) {
      onSendMessage(message);
    }
    setMessage("");
  };

  const handleChange = e => setMessage(e.target.value);

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={classes.ChatWindow}>
      <div className={classes.ChatWindow_content} ref={containerRef}>
        {children}
      </div>
      <ChatInput
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
