import React from "react";
import { logout } from "utils/index";
import { useHistory } from "react-router-dom";
import { useLogoutMutation } from "graphql/generated";
import Trigger from "./Trigger";
import Menu from "./Menu";

const MenuDrawer = ({ user = {}, open, onToggle }) => {
  const history = useHistory();
  const [logoutUser] = useLogoutMutation();
  const handleLogout = () =>
    logoutUser()
      .then(() => logout(history))
      .then(onToggle);

  return (
    <>
      <Trigger onClick={onToggle} />
      <Menu
        user={user}
        open={open}
        onClose={onToggle}
        onLogout={handleLogout}
      />
    </>
  );
};

export default MenuDrawer;
