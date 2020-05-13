import React, { useRef, useEffect } from "react";
import useStyles from "./styles";

const ChatWindow = ({ send, messages, onLoadMore, renderMessages }) => {
  const classes = useStyles();
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const handleUpdateView = () => {
      const { scrollTop, scrollHeight, offsetHeight } = chatWindowRef.current;
      if (messages?.length <= 20) {
        chatWindowRef.current.scrollTop = scrollHeight;
      } else {
        if (!(scrollTop + offsetHeight + 300 < scrollHeight) && !send) {
          chatWindowRef.current.scrollTop = scrollHeight;
        }

        if (send) {
          chatWindowRef.current.scrollTop = scrollHeight;
        }
      }
    };

    handleUpdateView();
  }, [messages]);

  const onScroll = async () => {
    if (chatWindowRef.current.scrollTop < 200) {
      await onLoadMore();
    }
  };

  return (
    <div className={classes.ChatWindow}>
      <div
        ref={chatWindowRef}
        onScroll={onScroll}
        className={classes.ChatWindow_content}
      >
        {/* {props.children} */}
        {renderMessages(messages)}
      </div>
    </div>
  );
};

export default ChatWindow;
