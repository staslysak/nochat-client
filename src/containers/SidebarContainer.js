import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback as useDebounce } from "use-debounce";
import Sidebar from "components/Sidebar";
import {
  sortByLastMessage,
  pasreQuery,
  errorHandler,
  logout,
} from "utils/index";
import {
  DirectCreatedDocument,
  DirectDeletedDocument,
  MessageCreatedDocument,
  MessageDeletedDocument,
  OnlineUserDocument,
  TypingUserDocument,
  DirectsDocument,
  useUsersLazyQuery,
  useDirectsQuery,
  useDeleteDirectMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} from "graphql/generated.tsx";

const SidebarContainer = () => {
  const history = useHistory();
  const { data: user } = useCurrentUserQuery();
  const { data: directs, subscribeToMore, client } = useDirectsQuery();
  const [searchUsers, { data: users }] = useUsersLazyQuery();
  const [deleteDirect] = useDeleteDirectMutation({ onError: errorHandler });
  const [logoutUser] = useLogoutMutation({
    onCompleted: () => logout(history),
  });

  const [typings, setTypings] = useState({});
  const currentUser = user?.currentUser ?? {};
  const { p: chatId } = pasreQuery(history.location);

  const directSubscriptions = [
    (chatId) =>
      subscribeToMore({
        document: TypingUserDocument,
        variables: { chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { typingUser } = subscriptionData.data;
          setTypings({ ...typings, [chatId]: typingUser });
          return prev;
        },
      }),
  ];

  useEffect(
    () => {
      const chatIds = (directs?.directs ?? []).map(({ id }) => id);
      const subscribtions = {
        messageCreated: (chatIds) =>
          subscribeToMore({
            document: MessageCreatedDocument,
            variables: { chatIds },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { messageCreated } = subscriptionData.data;
              const unread = messageCreated.userId !== currentUser.id ? 1 : 0;
              const directs = prev.directs.map((direct) => {
                if (direct.id === messageCreated.chatId) {
                  return {
                    ...direct,
                    lastMessage: messageCreated,
                    unread: direct.unread + unread,
                  };
                }
                return direct;
              });
              return { directs };
            },
          }),
        messageDeleted: () =>
          subscribeToMore({
            document: MessageDeletedDocument,
            variables: { chatIds },
            updateQuery: async (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { messageDeleted } = subscriptionData.data;

              const directs = prev.directs.map((direct) =>
                direct.id === messageDeleted.chat.id ||
                messageDeleted.ids === direct.lastMessage.id
                  ? messageDeleted.chat
                  : direct
              );

              client.writeQuery({ query: DirectsDocument, data: { directs } });
              return { directs };
            },
          }),
        directCreated: () =>
          subscribeToMore({
            document: DirectCreatedDocument,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const directs = prev.directs.concat(subscriptionData.data.direct);
              return { directs };
            },
          }),
        directDeleted: () =>
          subscribeToMore({
            document: DirectDeletedDocument,
            updateQuery: async (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const directs = prev.directs.filter(
                ({ id }) => id !== subscriptionData.data.direct.id
              );

              client.writeQuery({ query: DirectsDocument, data: { directs } });

              return { directs };
            },
          }),
        onlineUser: () => subscribeToMore({ document: OnlineUserDocument }),
      };

      const messageDeleted = subscribtions.messageDeleted(chatIds);
      const messageCreated = subscribtions.messageCreated(chatIds);
      const directCreated = subscribtions.directCreated();
      const directDeleted = subscribtions.directDeleted();
      const onlineUser = subscribtions.onlineUser();
      return () => {
        messageDeleted();
        messageCreated();
        directCreated();
        directDeleted();
        onlineUser();
      };
    },
    [(directs?.directs ?? []).length],
    subscribeToMore
  );

  const onSearch = (username) => {
    searchUsers({ variables: { username } });
  };

  const [debounceSearch] = useDebounce(onSearch, 300);

  const onDeleteDirect = (id) => {
    deleteDirect({ variables: { id } });
  };

  return (
    <Sidebar
      chatId={chatId}
      typings={typings}
      chats={(directs?.directs ?? []).sort(sortByLastMessage)}
      users={users?.users}
      currentUser={currentUser}
      onLogout={logoutUser}
      onSearch={debounceSearch}
      onDeleteDirect={onDeleteDirect}
      directSubscriptions={directSubscriptions}
    />
  );
};

export default SidebarContainer;
