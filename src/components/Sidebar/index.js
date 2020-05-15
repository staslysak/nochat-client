import React, { useState } from "react";
import { InputBase } from "@material-ui/core";
import { useStyles } from "./styles";
import UserItem from "components/UserItem";
import DirectItem from "components/DirectItem";
import StyledList from "components/StylesList";
import MenuDrawer from "components/MenuDrawer";
import { useSelector, useDispatch, dispatchToggleMenu } from "store";

const Sidebar = ({
  self,
  chatId,
  chats,
  users,
  onSearch,
  directSubscription,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { menuIsOpen, typingUsers } = useSelector((store) => store);

  const chatsMatch = chats
    .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
    .filter(({ user }) => user.username.startsWith(search));

  const chatsMatchIds = chatsMatch.map(({ user }) => user.id);

  const clearSearch = () => setSearch("");

  const toggleMenu = () => dispatch(dispatchToggleMenu());

  const handleonSearch = ({ target }) => {
    setSearch(target.value);
    onSearch(target.value);
  };

  return (
    <div className={classes.Sidebar}>
      <div className={classes.Sidebar_main}>
        <div className={classes.Sidebar_header}>
          <MenuDrawer open={menuIsOpen} user={self} onToggle={toggleMenu} />
          <InputBase
            fullWidth
            size="small"
            value={search}
            placeholder="Search"
            onChange={handleonSearch}
            className={classes.Sidebar_searchbar}
          />
        </div>
        <div className={classes.Sidebar_content}>
          <StyledList disablePadding visible={chats.length}>
            {chatsMatch.map((direct) => (
              <DirectItem
                key={direct.id}
                direct={direct}
                subscribtion={directSubscription}
                typingUser={typingUsers[direct.id]}
                selected={!search && direct.user.id === chatId}
                onClick={clearSearch}
              />
            ))}
          </StyledList>
          <StyledList subheader="Global search" visible={search} disablePadding>
            {users.map(
              (user) =>
                !chatsMatchIds.includes(user.id) && (
                  <UserItem
                    key={user.id}
                    user={user}
                    link={`/me?p=${user.id}`}
                    onClick={clearSearch}
                  />
                )
            )}
          </StyledList>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
