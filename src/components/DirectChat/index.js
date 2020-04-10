import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { formatDate } from "utils/index";
import Avatar from "components/Avatar";
import ChatWindow from "components/ChatWindow";
import ChatInput from "components/ChatWindow/ChatInput";
import Message from "components/Message";
import { DirectFallback } from "components/Fallback";
import Typing from "components/Typing";
import { useStyles } from "./styles";
import cx from "classnames";
// import VisibilitySenson from "react-visibility-sensor";

const DirectChat = (props) => {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    let unsubsribe = () => {};
    if (props.chatId) unsubsribe = props.subscribeToUserTyping(props.chatId);
    return () => unsubsribe(props.chatId);
  }, [props.chatId]);

  React.useEffect(() => {
    let unsubsribe = () => {};
    if (props.chatId) unsubsribe = props.subscribeToNewMessage(props.chatId);
    return () => unsubsribe(props.chatId);
  }, [props.chatId]);

  React.useEffect(() => {
    let unsubsribe = () => {};
    if (props.chatId) unsubsribe = props.subscribeToDeleteMessage(props.chatId);
    return () => unsubsribe(props.chatId);
  }, [props.chatId]);

  React.useEffect(() => {
    let unsubsribe = () => {};
    if (props.chatId) unsubsribe = props.subscribeToDeleteDirect(props.chatId);
    return () => unsubsribe(props.chatId);
  }, [props.chatId]);

  React.useEffect(() => {
    let unsubsribe = props.subscribeToNewDirect();
    return () => unsubsribe();
  }, []);

  const handleSendMessage = () => {
    if (message.trim().length) {
      props.onCreateMessage(message);
    }
    setMessage("");
  };

  const handleChange = (e) => {
    if (props.chatId) {
      props.onTyping();
    }
    setMessage(e.target.value);
  };

  // const handleOnReadMessage = (isVisible) => {
  //   console.log(isVisible, message.text, message);
  //   console.log(isVisible && message.unread);
  //   if (isVisible && message.unread) props.onReadMessage(message.id);
  // };

  const renderStatus = () => {
    if (props.typingUser) return <Typing variant="secondary" />;
    if (props.recipient.online) return "online";

    return formatDate(props.recipient.lastSeen, "last seen ");
  };

  const renderMessages = React.useMemo(
    () =>
      props.messages &&
      props.messages.map((message) => (
        // <VisibilitySenson
        //   offset={{ top: 32, bottom: 32 }}
        //   onChange={handleOnReadMessage}
        // >
        <Message
          key={message.id}
          text={message.text}
          date={message.createdAt}
          isOwner={message.userId === props.user.id}
          menuProps={{
            onDelete: props.onDeleteMessage(message.id),
          }}
        />
        // </VisibilitySenson>
      )),
    [props.messages]
  );

  return (
    <div className={classes.DirectChat}>
      {props.show && (
        <>
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
                      [classes.DirectChat_header_status]:
                        props.recipient.online,
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
            <ChatWindow>
              {!props.messages ? <DirectFallback /> : renderMessages}
            </ChatWindow>
            <ChatInput
              value={message}
              onChange={handleChange}
              onSubmit={handleSendMessage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DirectChat;
