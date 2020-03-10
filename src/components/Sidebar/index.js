import React from "react";
import { IconButton, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { dispatchLogout, dispatchDirects, dispatchUser } from "redux/actions";
import { USER, USERS, DIRECTS } from "graphql/queries";
import { pasreQuery, formatDate } from "utils/index";
import { LOGOUT } from "graphql/mutations";
import MainBlock from "components/MainBlock";
import MenuDrawer from "components/MenuDrawer";
import ChatItem from "components/ChatItem";
import UserItem from "components/UserItem";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  backdrop: {
    width: "100%",
    zIndex: 1300,
    maxWidth: 960,
    left: "auto",
    right: "auto"
  }
}));

const Sidebar = props => {
  const classes = useStyles();
  const [state, setstate] = React.useState({ open: false, timer: null, value: "" });

  React.useEffect(() => {
    setstate({ value: "" });
  }, [props.location]);

  const [users, usersData] = useLazyQuery(USERS);
  const directsData = useQuery(DIRECTS, {
    onCompleted: data => {
      props.dispatchDirects(data.directs);
    }
  });
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      props.client.resetStore();
      props.dispatchLogout();
    }
  });

  const { loading } = useQuery(USER, {
    onCompleted: data => {
      props.dispatchUser(data);
    }
  });

  const handleMenuToggle = () => setstate({ ...state, open: !state.open });

  const handleOnChange = e => {
    const { value } = e.target;
    clearTimeout(state.timer);
    setstate({ value });
    if (value) {
      const timer = setTimeout(() => users({ variables: { username: value } }), 200);
      setstate({ value, timer });
    }
  };

  const renderDirects = () => {
    const { p } = pasreQuery(props.location);
    if (!state.value.length && directsData.data)
      return props.directs.map(({ user, lastMessage }) => {
        return (
          <ChatItem
            key={user.username}
            name={user.username}
            avatar={user.avatar}
            updatedAt={formatDate(lastMessage.createdAt)}
            lastMessage={lastMessage.text}
            unreaded={user.id}
            selected={p === user.id}
            link={() => `/?p=${user.id}`}
          />
        );
      });
  };

  const renderUsers = () => {
    if (state.value.length && usersData.data)
      return usersData.data.users.map(({ id, username, avatar }) => (
        <UserItem
          key={username}
          userId={id}
          name={username}
          avatar={avatar}
          username={username}
          link={`/?p=${id}`}
        />
      ));
  };

  return (
    <>
      <MenuDrawer
        open={state.open}
        user={props.user}
        onToggle={handleMenuToggle}
        onLogout={logout}
      />
      <MainBlock
        searchbarProps={{
          value: state.value,
          placeholder: "Search",
          onChange: handleOnChange
        }}
        header={
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        }
      >
        {!loading && (
          <>
            {renderDirects()}
            {renderUsers()}
          </>
        )}
      </MainBlock>
      <Backdrop
        open={!!state.open}
        onClick={handleMenuToggle}
        className={classes.backdrop}
      />
    </>
  );
};

export default connect(({ auth }) => ({ directs: auth.directs, user: auth.user }), {
  dispatchUser,
  dispatchLogout,
  dispatchDirects
})(withApollo(Sidebar));
