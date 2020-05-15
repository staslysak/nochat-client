import React, { useEffect, useState } from "react";
import ChatItem from "components/ChatItem";
import DirectItemMenu from "./DirectItemMenu";
import { errorHandler } from "utils/index";
import { useDeleteDirectMutation } from "graphql/generated.tsx";

const DirectItem = ({
  direct,
  typingUser,
  onDelete,
  subscribtion,
  ...props
}) => {
  const [deleteChat] = useDeleteDirectMutation({ onError: errorHandler });

  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribtion(direct.id);
    return () => unsubscribe(direct.id);
  }, [direct.id, subscribtion]);

  const handleOpen = (e) => {
    e.preventDefault();
    setContextMenu(e.currentTarget);
  };

  const handleClose = () => setContextMenu(null);

  const handleDelete = () => {
    deleteChat({ variables: { id: direct.id } });
  };

  return (
    <>
      <ChatItem
        typing={typingUser === direct.user.username ? typingUser : ""}
        unread={direct.unread}
        avatar={direct.user.avatar}
        online={direct.user.online}
        primary={direct.user.username}
        secondary={direct.lastMessage.text}
        link={`/me?p=${direct.user.id}`}
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
