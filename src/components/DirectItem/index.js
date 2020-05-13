import React, { useEffect, useState } from "react";
import ChatItem from "components/ChatItem";
import DirectItemMenu from "./DirectItemMenu";

const DirectItem = ({
  direct,
  link,
  typing,
  selected,
  user,
  onDelete,
  subscribtions,
  ...props
}) => {
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const unsubscribes = subscribtions.map((subscribe) => subscribe(direct.id));
    return () => unsubscribes.map((unsubscribe) => unsubscribe(direct.id));
  }, [direct.id, subscribtions]);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleClose = () => setContextMenu(null);

  const handleDelete = () => {
    onDelete(direct.id);
  };

  return (
    <>
      <ChatItem
        link={link}
        typing={typing}
        selected={selected}
        avatar={user.avatar}
        online={user.online}
        unread={direct.unread}
        primary={user.username}
        secondary={direct.lastMessage.text}
        date={direct.lastMessage.createdAt}
        onContextMenu={handleOpen}
        {...props}
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
