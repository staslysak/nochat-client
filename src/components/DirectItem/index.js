import React from "react";
import ChatItem from "components/ChatItem";
import DirectItemMenu from "./DirectItemMenu";

const DirectItem = (props) => {
  const [contextMenu, setContextMenu] = React.useState(null);

  React.useEffect(() => {
    const unsubscribes = props.subscribtions.map((subscribe) =>
      subscribe(props.direct.id)
    );
    return () =>
      unsubscribes.map((unsubscribe) => unsubscribe(props.direct.id));
  }, [props.direct.id, props.subscribtions]);

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
