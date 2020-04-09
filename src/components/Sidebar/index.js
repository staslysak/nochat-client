import React from "react";
import { IconButton, InputBase, ListSubheader, List } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useDebouncedCallback } from "use-debounce";
import { useStyles } from "./styles";
import MainBlock from "components/MainBlock";
import MenuDrawer from "components/MenuDrawer";
import UserItem from "components/UserItem";
import DirectItem from "components/DirectItem";
import StyledList from "components/StylesList";

const Sidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const renderUsers = (data) => {
    return data ? (
      <StyledList subheader="Global search">
        {data.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            link={`/?p=${user.id}`}
            onClick={() => setSearch("")}
          />
        ))}
      </StyledList>
    ) : null;
  };

  const renderDirects = (data) => {
    return data.map((direct) => (
      <DirectItem
        key={direct.id}
        direct={direct}
        user={direct.user}
        typing={
          props.typings[direct.id] === direct.user.username
            ? props.typings[direct.id]
            : ""
        }
        link={`/?p=${direct.user.id}`}
        selected={direct.user.id === props.chatId}
        onDelete={props.onDeleteDirect}
        subscribeToUserTyping={props.subscribeToUserTyping}
        subscribeToNewMessage={props.subscribeToNewMessage}
        subscribeToDeleteMessage={props.subscribeToDeleteMessage}
      />
    ));
  };

  React.useEffect(() => {
    setSearch("");
  }, [props.chatId]);

  React.useEffect(() => {
    const unsubscribe = props.subscribeToNewDirect();
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.subscribeToDeleteDirect();
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.subscribeToOnlineUsers();
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    props.onConnect();

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      return props.onDisconnect();
    });
  }, []);

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
      <MenuDrawer
        open={open}
        user={props.currentUser}
        onLogout={props.onLogout}
        onToggle={handleMenuToggle}
      />
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
          ? renderDirects(props.directs)
          : renderUsers(props.users)}
      </MainBlock>
    </div>
  );
};

export default Sidebar;
