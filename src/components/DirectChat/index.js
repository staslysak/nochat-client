import React, { useCallback, useState } from "react";
import { ListItem, ListItemText, Divider } from "@material-ui/core";
import {
  formatDate,
  diffTime,
  renderDiffTimeLabel,
  renderTimeline,
} from "utils/index";
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

const DirectChat = ({
  chatId,
  user,
  recipient,
  typingUser,
  messages,
  onTyping,
  onCreateMessage,
  onDeleteMessage,
  onLoadMoreMessages,
}) => {
  const classes = useStyles();
  const timeline = renderTimeline([...messages].reverse());
  const [send, setSend] = useState(false);

  const handleChange = () => {
    if (chatId) onTyping();
  };

  const handleCreateMessage = async (message) => {
    setSend(true);
    await onCreateMessage(message);
    setSend(false);
  };

  const renderStatus = () => {
    if (typingUser) return <Typing variant="secondary" />;
    if (recipient.online) return "online";
    return `last seen at ${formatDate(recipient.lastSeen)}`;
  };

  const renderMessages = useCallback(
    (messages) =>
      messages.length ? (
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
                isOwner={message.userId === user.id}
                menuProps={{
                  onDelete: onDeleteMessage(message.id),
                }}
              />
            </div>
          );
        })
      ) : (
        <DirectFallback />
      ),
    [chatId, user.id, messages, onDeleteMessage]
  );

  return (
    <div className={classes.DirectChat}>
      <div className={classes.DirectChat_header}>
        {recipient.username && (
          <ListItem dense>
            <ListItemText
              primary={recipient.username}
              primaryTypographyProps={{ component: "div" }}
              secondary={renderStatus()}
              secondaryTypographyProps={{
                variant: "caption",
                className: cx({
                  [classes.DirectChat_header_status]: recipient.online,
                }),
              }}
            />
            <Avatar
              src={recipient.avatar}
              alt={recipient.username}
              online={recipient.online}
            />
          </ListItem>
        )}
      </div>
      <div className={classes.DirectChat_content}>
        <ChatWindow
          send={send}
          messages={messages}
          onLoadMore={onLoadMoreMessages}
          renderMessages={renderMessages}
        />
        <Divider />
        <ChatInput onChange={handleChange} onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
};

export default DirectChat;
