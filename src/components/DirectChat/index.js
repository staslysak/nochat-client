import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { formatDate } from "utils/index";
import MainBlock from "components/MainBlock";
import Avatar from "components/Avatar";
import ChatWindow from "components/ChatWindow";
import Message from "components/Message";
import { DirectFallback } from "components/Fallback";
import { useStyles } from "./styles";

const DirectChat = ({
  user,
  show,
  chatId,
  recipient,
  messages,
  subscribeToNewMessage,
  onCreateMessage
}) => {
  const classes = useStyles();

  const renderMessages = React.useMemo(() => {
    return !messages ? (
      <DirectFallback />
    ) : (
      messages.map(message => (
        <Message
          key={message.id}
          {...message}
          isOwner={message.userId === user.id}
        />
      ))
    );
  }, [messages]);

  return (
    <MainBlock
      show={show}
      header={
        <ListItem dense className={classes.DirectChat_header}>
          <ListItemText
            primary={recipient.username}
            primaryTypographyProps={{ component: "div" }}
            secondary={`last seen ${formatDate(recipient.createdAt)}`}
            secondaryTypographyProps={{ variant: "caption" }}
          />
          <Avatar src={recipient.avatar} alt={recipient.username} />
        </ListItem>
      }
    >
      <ChatWindow
        chatId={chatId}
        onSendMessage={onCreateMessage}
        subscribeToNewMessage={subscribeToNewMessage}
      >
        {renderMessages}
      </ChatWindow>
    </MainBlock>
  );
};

export default DirectChat;
