import React, { useCallback } from "react";
import { ListItem, ListItemText, Divider } from "@material-ui/core";
import {
  formatDate,
  diffTime,
  renderDiffTimeLabel,
  renderTimeline,
} from "utils/index";
import Avatar from "components/Avatar";
import ChatWindow, { updateView } from "components/ChatWindow";
import ChatInput from "components/ChatWindow/ChatInput";
import StyledChip from "components/StyledChip";
import Message from "components/Message";
import { DirectFallback } from "components/Fallback";
import Typing from "components/Typing";
import { useStyles } from "./styles";
import cx from "classnames";
import { useSelector } from "store";

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
  recipient,
  messages,
  onCreateMessage,
  onDeleteMessage,
  onLoadMoreMessages,
}) => {
  const { isTyping, user } = useSelector(({ typingUsers, user }) => ({
    user,
    isTyping: typingUsers[chatId] === user.username ? "" : typingUsers[chatId],
  }));
  const classes = useStyles();
  const chatWindowRef = React.useRef();
  const timeline = renderTimeline([...messages].reverse());

  const handleCreateMessage = async (message) => {
    await onCreateMessage(message).then(() => {
      updateView(chatWindowRef);
    });
  };

  const renderStatus = () => {
    if (isTyping) return <Typing variant="secondary" />;
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
    [chatId, messages, onDeleteMessage]
  );

  return (
    <div className={classes.DirectChat}>
      <div className={classes.DirectChat_header}>
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
      </div>
      <div className={classes.DirectChat_content}>
        <ChatWindow
          ref={chatWindowRef}
          messages={messages}
          onLoadMore={onLoadMoreMessages}
          renderMessages={renderMessages}
        />
        <Divider />
        <ChatInput
          chatId={chatId}
          username={user.username}
          onSubmit={handleCreateMessage}
        />
      </div>
    </div>
  );
};

export default React.memo(DirectChat);
