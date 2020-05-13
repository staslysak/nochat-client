import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useStyles } from "./styles";
import UserItem from "components/UserItem";
import DirectItem from "components/DirectItem";
import StyledList from "components/StylesList";
import MenuDrawer from "components/MenuDrawer";

const Sidebar = ({
  chatId,
  chats,
  users,
  typings,
  currentUser,
  directSubscriptions,
  onSearch,
  onLogout,
  onDeleteDirect,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const clearSearch = () => setSearch("");

  const renderChats = () => {
    const directsMatch = chats.filter(({ user }) =>
      user.username.startsWith(search)
    );

    const directsMatchIds = directsMatch.map(({ user }) => user.id);

    return (
      <>
        <StyledList disablePadding>
          {directsMatch.map((direct) => (
            <DirectItem
              key={direct.id}
              direct={direct}
              user={direct.user}
              typing={
                typings[direct.id] === direct.user.username
                  ? typings[direct.id]
                  : ""
              }
              link={`/me?p=${direct.user.id}`}
              selected={!search && direct.user.id === chatId}
              onDelete={onDeleteDirect}
              subscribtions={directSubscriptions}
              onClick={clearSearch}
            />
          ))}
        </StyledList>
        {!!users?.length && (
          <StyledList subheader="Global search" disablePadding>
            {users.map(
              (user) =>
                !directsMatchIds.includes(user.id) && (
                  <UserItem
                    key={user.id}
                    user={user}
                    link={`/me?p=${user.id}`}
                    onClick={clearSearch}
                  />
                )
            )}
          </StyledList>
        )}
      </>
    );
  };

  const handleChange = ({ target }) => {
    setSearch(target.value);
    onSearch(target.value);
  };

  const handleMenuToggle = () => setOpen(!open);

  return (
    <div className={classes.Sidebar}>
      <MenuDrawer
        open={open}
        user={currentUser}
        onClose={handleMenuToggle}
        onLogout={onLogout}
      />
      <div className={classes.Sidebar_main}>
        <div className={classes.Sidebar_header}>
          <IconButton edge="start" color="inherit" onClick={handleMenuToggle}>
            <MenuIcon />
          </IconButton>
          <InputBase
            fullWidth
            size="small"
            value={search}
            placeholder="Search"
            className={classes.Sidebar_searchbar}
            onChange={handleChange}
          />
        </div>
        <div className={classes.Sidebar_content}>{renderChats(chats)}</div>
      </div>
    </div>
  );
};

export default Sidebar;
