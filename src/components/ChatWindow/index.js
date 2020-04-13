import React from "react";
import useStyles from "./styles";

const ChatWindow = (props) => {
  const classes = useStyles();
  const chatWindowRef = React.useRef(null);

  React.useEffect(() => {
    const handleUpdateView = () => {
      const { scrollTop, scrollHeight, offsetHeight } = chatWindowRef.current;
      if (props.messages && props.messages.length <= 20) {
        chatWindowRef.current.scrollTop = scrollHeight;
      } else {
        if (!(scrollTop + offsetHeight + 300 < scrollHeight) && !props.send) {
          chatWindowRef.current.scrollTop = scrollHeight;
        }

        if (props.send) {
          chatWindowRef.current.scrollTop = scrollHeight;
        }
      }
    };

    handleUpdateView();
  }, [props.messages]);

  const onScroll = async () => {
    if (chatWindowRef.current.scrollTop < 200) {
      await props.onLoadMoreMessages();
      if (props.hasMore) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollTop + 10;
      }
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
        {props.renderMessages(props.messages)}
      </div>
    </div>
  );
};

export default ChatWindow;
