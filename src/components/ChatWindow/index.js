import React from "react";
import useStyles from "./styles";

const ChatWindow = (props) => {
  const classes = useStyles();
  const chatWindowRef = React.createRef();

  const handleViewUpdate = React.useCallback(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [props.children]);

  React.useEffect(() => {
    handleViewUpdate();
  }, [chatWindowRef, handleViewUpdate]);

  return (
    <div className={classes.ChatWindow}>
      <div className={classes.ChatWindow_content} ref={chatWindowRef}>
        {props.children}
      </div>
    </div>
  );
};

export default ChatWindow;
