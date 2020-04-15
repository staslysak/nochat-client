import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useDebouncedCallback } from "use-debounce";
import { useStyles } from "./styles";
import MenuDrawer from "components/MenuDrawer";
import UserItem from "components/UserItem";
import DirectItem from "components/DirectItem";
import StyledList from "components/StylesList";

const Sidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const renderDirectsList = (data, addProps = {}) => {
    return data ? (
      <StyledList disablePadding>
        {data.map((direct) => (
          <DirectItem
            key={direct.id}
            direct={direct}
            user={direct.user}
            typing={
              props.typings[direct.id] === direct.user.username
                ? props.typings[direct.id]
                : ""
            }
            link={`/me?p=${direct.user.id}`}
            selected={direct.user.id === props.chatId}
            onDelete={props.onDeleteDirect}
            subscribeToUserTyping={props.subscribeToUserTyping}
            subscribeToNewMessage={props.subscribeToNewMessage}
            subscribeToDeleteMessage={props.subscribeToDeleteMessage}
            {...addProps}
          />
        ))}
      </StyledList>
    ) : null;
  };

  const renderDirects = () => {
    if (search.length) {
      let directsMatch = [];

      if (props.directs && props.directs.length) {
        directsMatch = props.directs.filter(({ user }) =>
          user.username.startsWith(search)
        );
      }

      const directsMatchIds = directsMatch.map(({ user }) => user.id);

      return (
        <>
          {renderDirectsList(directsMatch, {
            selected: false,
            onClick: () => setSearch(""),
          })}
          {props.users && props.users.length ? (
            <StyledList subheader="Global search" disablePadding>
              {props.users.map(
                (user) =>
                  !directsMatchIds.includes(user.id) && (
                    <UserItem
                      key={user.id}
                      user={user}
                      link={`/me?p=${user.id}`}
                      onClick={() => setSearch("")}
                    />
                  )
              )}
            </StyledList>
          ) : null}
        </>
      );
    }

    return renderDirectsList(props.directs);
  };

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
      {/* <MenuDrawer.Drawer /> */}
      <MenuDrawer
        open={open}
        user={props.currentUser}
        onClose={handleMenuToggle}
        onLogout={props.onLogout}
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
        <div className={classes.Sidebar_content}>
          {renderDirects(props.directs)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
