import React from "react";
import { connect } from "react-redux";
import { dispatchChatId, dispatchLogout } from "redux/actions";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { USER, USERS, DIRECTS } from "graphql/queries";
import { LOGOUT } from "graphql/mutations";
import { formatDate, pasreQuery } from "utils/index";
import ChatItem from "components/ChatItem";
import UserItem from "components/UserItem";
import Sidebar from "components/Sidebar";

const SidebarContainer = props => {
  const [searchUsers, usersData] = useLazyQuery(USERS);
  const directsData = useQuery(DIRECTS);
  const userData = useQuery(USER);
  const [onLogout, { client }] = useMutation(LOGOUT, {
    onCompleted: () => {
      client.resetStore();
      props.dispatchLogout();
    }
  });

  const chatId = pasreQuery(props.location).p;
  console.log("sib");

  const onSearch = username => searchUsers({ variables: { username } });

  const renderDirects = React.useCallback(() => {
    const { data } = directsData;

    if (!data) {
      return null;
    }

    if (userData.loading) {
      return null;
    }

    return data.directs.map(({ id, user, lastMessage, unread }) => (
      <ChatItem
        key={id}
        unread={unread}
        name={user.username}
        avatar={user.avatar}
        link={`/?p=${user.id}`}
        lastMessage={lastMessage.text}
        updatedAt={formatDate(lastMessage.createdAt)}
        selected={user.id === chatId}
        onClick={() => props.dispatchChatId(id)}
      />
    ));
  }, [directsData, props.location]);

  const renderUsers = () => {
    const { data } = usersData;

    if (!data) {
      return null;
    }

    return data.users.map(({ id, username, avatar }) => (
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
    <Sidebar
      chatId={chatId}
      renderChats={search => (search.length ? renderUsers() : renderDirects())}
      onSearch={onSearch}
      onLogout={onLogout}
    />
  );
};

export default React.memo(
  connect(null, {
    dispatchChatId,
    dispatchLogout
  })(SidebarContainer)
);
