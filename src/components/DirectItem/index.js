import React from "react";
import ChatItem from "components/ChatItem";
import DirectItemMenu from "./DirectItemMenu";

const DirectItem = (props) => {
  React.useEffect(() => {
    const unsubscribe = props.subscribeToUserTyping(props.direct.id);
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.subscribeToDeleteMessage(props.direct.id);
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.subscribeToNewMessage(props.direct.id);
    return () => unsubscribe();
  }, []);

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleClose = () => setContextMenu(null);

  const handleDelete = () => {
    props.onDelete(props.direct.id);
  };

  return (
    <>
      <ChatItem
        link={props.link}
        typing={props.typing}
        selected={props.selected}
        avatar={props.user.avatar}
        online={props.user.online}
        unread={props.direct.unread}
        primary={props.user.username}
        secondary={props.direct.lastMessage.text}
        date={props.direct.lastMessage.createdAt}
        onClick={props.onClick}
        onContextMenu={handleOpen}
      />
      <DirectItemMenu
        anchorEl={contextMenu}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DirectItem;
