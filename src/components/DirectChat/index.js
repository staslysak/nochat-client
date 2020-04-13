import React from "react";
import { ListItem, ListItemText, Divider } from "@material-ui/core";
import { formatDate, diffTime, renderDiffTimeLabel } from "utils/index";
import Avatar from "components/Avatar";
import ChatWindow from "components/ChatWindow";
import ChatInput from "components/ChatWindow/ChatInput";
import StyledChip from "components/StyledChip";
import Message from "components/Message";
import { DirectFallback } from "components/Fallback";
import Typing from "components/Typing";
import { useStyles } from "./styles";
import cx from "classnames";
// import VisibilitySenson from "react-visibility-sensor";
// <VisibilitySenson
//   offset={{ top: 32, bottom: 32 }}
//   onChange={handleOnReadMessage}
// >

// const handleOnReadMessage = (isVisible) => {
//   console.log(isVisible, message.text, message);
//   console.log(isVisible && message.unread);
//   if (isVisible && message.unread) props.onReadMessage(message.id);
// };

const renderTimeline = (data) => {
  const timeline = {};

  if (data) {
    [...data].reverse().forEach(({ createdAt }, idx) => {
      if (!timeline[diffTime(createdAt, "days")]) {
        timeline[diffTime(createdAt, "days")] = idx;
      }
    });
  }
  return timeline;
};

const DirectChat = (props) => {
  const classes = useStyles();
  const timeline = renderTimeline(props.messages);
  const [send, setSend] = React.useState(false);

  React.useEffect(() => {
    const unsubsribe = props.subscribeToUserTyping();
    return () => unsubsribe();
  }, [props.subscribeToUserTyping]);

  React.useEffect(() => {
    const unsubsribe = props.subscribeToNewMessage();
    return () => unsubsribe();
  }, [props.subscribeToNewMessage]);

  React.useEffect(() => {
    const unsubsribe = props.subscribeToDeleteMessage();
    return () => unsubsribe();
  }, [props.subscribeToDeleteMessage]);

  React.useEffect(() => {
    const unsubsribe = props.subscribeToDeleteDirect();
    return () => unsubsribe();
  }, [props.subscribeToDeleteDirect]);

  React.useEffect(() => {
    const unsubsribe = props.subscribeToNewDirect();
    return () => unsubsribe();
  }, []);

  const handleChange = () => {
    if (props.chatId) {
      props.onTyping();
    }
  };

  const handleCreateMessage = async (message) => {
    setSend(true);
    await props.onCreateMessage(message);
    setSend(false);
  };

  const renderStatus = () => {
    if (props.typingUser) return <Typing variant="secondary" />;
    if (props.recipient.online) return "online";
    return `last seen at ${formatDate(props.recipient.lastSeen)}`;
  };

  const renderMessages = React.useCallback(
    (messages) =>
      messages ? (
        [...messages].reverse().map((message, idx) => {
          const timeDiff = diffTime(message.createdAt, "days");

          const timelineChip = idx === timeline[timeDiff] && (
            <StyledChip label={renderDiffTimeLabel(message.createdAt)} />
          );

          return (
            <div key={message.id} className={classes.DirectChat_messageWrapper}>
              {timelineChip}
              <Message
                text={message.text}
                date={message.createdAt}
                isOwner={message.userId === props.user.id}
                menuProps={{
                  onDelete: props.onDeleteMessage(message.id),
                }}
              />
            </div>
          );
        })
      ) : (
        <DirectFallback />
      ),
    [props.chatId, props.messages]
  );

  return (
    <div className={classes.DirectChat}>
      <div className={classes.DirectChat_header}>
        {props.recipient.username && (
          <ListItem dense>
            <ListItemText
              primary={props.recipient.username}
              primaryTypographyProps={{ component: "div" }}
              secondary={renderStatus()}
              secondaryTypographyProps={{
                variant: "caption",
                className: cx({
                  [classes.DirectChat_header_status]: props.recipient.online,
                }),
              }}
            />
            <Avatar
              src={props.recipient.avatar}
              alt={props.recipient.username}
              online={props.recipient.online}
            />
          </ListItem>
        )}
      </div>
      <div className={classes.DirectChat_content}>
        <ChatWindow
          send={send}
          hasMore={props.hasMore}
          messages={props.messages}
          renderMessages={renderMessages}
          onLoadMoreMessages={props.onLoadMoreMessages}
        />
        <Divider />
        <ChatInput onChange={handleChange} onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
};

export default DirectChat;
