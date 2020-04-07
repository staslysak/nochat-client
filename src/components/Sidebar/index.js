import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useDebouncedCallback } from "use-debounce";
import { useStyles } from "./styles";
import MainBlock from "components/MainBlock";
import MenuDrawer from "components/MenuDrawer";
import ChatItem from "components/ChatItem";
import UserItem from "components/UserItem";

const renderDirects = (data, chatId) => {
  return data
    ? data.map((direct) => (
        <ChatItem
          chat={direct}
          key={direct.id}
          user={direct.user}
          unread={direct.unread}
          link={`/?p=${direct.user.id}`}
          lastMessage={direct.lastMessage}
          selected={direct.user.id === chatId}
        />
      ))
    : null;
};

const renderUsers = (data) => {
  return data
    ? data.map((user) => (
        <UserItem key={user.id} user={user} link={`/?p=${user.id}`} />
      ))
    : null;
};

const Sidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setSearch("");
  }, [props.chatId]);

  React.useEffect(() => {
    props.subscribeToOnlineUsers();
    props.subscribeToNewDirect();
    props.subscribeToDeleteDirect();
    console.log("asd");

    props.setOnline();

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      return props.setOffline();
    });

    return () => props.setOffline();
  }, []);

  React.useEffect(() => {
    let unsubsribes;
    if (props.directs) {
      unsubsribes = props.subscribeToNewMessage();

      if (unsubsribes.length > 0) {
        unsubsribes.forEach((unsubsribe) => unsubsribe());
      }

      unsubsribes = props.subscribeToNewMessage();
    }
  }, [props.directslength]);

  React.useEffect(() => {
    let unsubsribes;
    if (props.directs) {
      unsubsribes = props.subscribeToDeleteMessage();

      if (unsubsribes.length > 0) {
        unsubsribes.forEach((unsubsribe) => unsubsribe());
      }

      unsubsribes = props.subscribeToDeleteMessage();
    }
  }, [props.directslength]);

  const [debounce] = useDebouncedCallback(
    (value) => props.onSearch(value),
    200
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    debounce(e.target.value);
  };

  const handleMenuToggle = () => setOpen(!open);

  return (
    <div className={classes.Sidebar}>
      <MenuDrawer open={open} onToggle={handleMenuToggle} />
      <MainBlock
        header={
          <div className={classes.Sidebar_header}>
            <IconButton
              edge="start"
              color="inherit"
              className={classes.Sidebar_menuButton}
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <InputBase
              size="small"
              value={search}
              placeholder="Search"
              className={classes.Sidebar_searchbar}
              onChange={handleChange}
            />
          </div>
        }
      >
        {!search.length
          ? renderDirects(props.directs, props.chatId)
          : renderUsers(props.users)}
      </MainBlock>
    </div>
  );
};

export default Sidebar;
