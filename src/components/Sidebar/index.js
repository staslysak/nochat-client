import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useDebouncedCallback } from "use-debounce";
import MainBlock from "components/MainBlock";
import MenuDrawer from "components/MenuDrawer";
import { useStyles } from "./styles";

const Sidebar = ({ onSearch, onLogout, renderChats, chatId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setSearch("");
    return () => setSearch("");
  }, [chatId]);

  const [debounce] = useDebouncedCallback(value => onSearch(value), 200);

  const handleChange = e => {
    setSearch(e.target.value);
    debounce(e.target.value);
  };

  const handleMenuToggle = () => setOpen(!open);

  return (
    <div className={classes.Sidebar}>
      <MenuDrawer open={open} onToggle={handleMenuToggle} onLogout={onLogout} />
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
              placeholder="Search"
              className={classes.Sidebar_searchbar}
              onChange={handleChange}
            />
          </div>
        }
      >
        {renderChats(search)}
      </MainBlock>
    </div>
  );
};

export default React.memo(Sidebar);
