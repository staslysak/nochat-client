import React, { useEffect, forwardRef } from "react";
import useStyles from "./styles";

export const updateView = (ref) => {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
};

const ChatWindow = forwardRef(
  ({ messages, onLoadMore, renderMessages }, ref) => {
    const classes = useStyles();

    useEffect(() => {
      const handleUpdateView = () => {
        const { scrollTop, scrollHeight, offsetHeight } = ref.current;
        if (messages.length <= 20) {
          updateView(ref);
        } else if (scrollTop + offsetHeight + 300 > scrollHeight) {
          updateView(ref);
        }
      };

      handleUpdateView();
    }, [messages]);

    const onScroll = async () => {
      if (ref.current.scrollTop < 200) await onLoadMore();
    };

    return (
      <div className={classes.ChatWindow}>
        <div
          ref={ref}
          onScroll={onScroll}
          className={classes.ChatWindow_content}
        >
          {/* {props.children} */}
          {renderMessages(messages)}
        </div>
      </div>
    );
  }
);

export default React.memo(ChatWindow);
