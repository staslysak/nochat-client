import React from "react";
import { DIRECTS, DIRECT_LAST_MESSAGE } from "graphql/queries";
import {
  NEW_MESSAGE_SUBSCRIPTION,
  NEW_DIRECT_SUBSCRIPTION,
  DELETE_MESSAGE_SUBSCRIPTION,
  DELETE_DIRECT_SUBSCRIPTION,
  ONLINE_USER_SUBSCRIPTION,
} from "graphql/subscriptions";
import { pasreQuery } from "utils/index";
import Sidebar from "components/Sidebar";
import { get } from "lodash-es";
import { useSibebarFetch } from "hooks/index";

const sortByLastMessage = (a, b) =>
  b.lastMessage.createdAt - a.lastMessage.createdAt;

const SidebarContainer = (props) => {
  const {
    queries: { user, directs },
    lazyQueries: {
      searchUsers: [searchUsers, searchUsersData],
    },
    mutations: { setOnline, setOffline },
  } = useSibebarFetch();

  const chatId = pasreQuery(props.location).p;

  const subscribeToNewMessage = () => {
    return [...directs.data.directs].map(({ id }) => {
      return directs.subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const { newMessage } = subscriptionData.data;
          const currentUser = get(user, "data.currentUser");
          const unread = newMessage.userId !== currentUser.id ? 1 : 0;

          const directs = prev.directs
            .map((direct) => {
              if (direct.id === id) {
                direct = {
                  ...direct,
                  lastMessage: newMessage,
                  unread: direct.unread + unread,
                };
              }
              return direct;
            })
            .sort(sortByLastMessage);

          return { directs };
        },
      });
    });
  };

  const subscribeToNewDirect = () => {
    return directs.subscribeToMore({
      document: NEW_DIRECT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newDirect } = subscriptionData.data;
        const directs = prev.directs.concat(newDirect);
        return { directs };
      },
    });
  };

  const subscribeToDeleteMessage = () => {
    return [...directs.data.directs].map(({ id }) => {
      return directs.subscribeToMore({
        document: DELETE_MESSAGE_SUBSCRIPTION,
        variables: { chatId: id },
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const currentUser = get(user, "data.currentUser");
          const { deleteMessage } = subscriptionData.data;

          return await directs.client
            .query({
              query: DIRECT_LAST_MESSAGE,
              variables: { chatId: id },
              fetchPolicy: "no-cache",
            })
            .then(({ data }) => {
              const directsData = [...prev.directs].map((direct) => {
                const unread = deleteMessage.userId !== currentUser.id ? 1 : 0;

                if (direct.lastMessage.id === deleteMessage.id) {
                  direct = {
                    ...direct,
                    lastMessage: data.directLastMessage,
                    unread: direct.unread - unread,
                  };
                }

                return direct;
              });

              directs.client.writeQuery({
                query: DIRECTS,
                data: { directs: directsData },
              });

              return { directs: directsData };
            });
        },
      });
    });
  };

  const subscribeToDeleteDirect = () => {
    return directs.subscribeToMore({
      document: DELETE_DIRECT_SUBSCRIPTION,
      updateQuery: async (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { deleteDirect } = subscriptionData.data;

        const directsData = prev.directs.filter(
          (direct) => direct.id !== deleteDirect.id
        );

        directs.client.writeQuery({
          query: DIRECTS,
          data: { directs: directsData },
        });

        return { directs: directsData };
      },
    });
  };

  const subscribeToOnlineUsers = () => {
    return directs.subscribeToMore({
      document: ONLINE_USER_SUBSCRIPTION,
    });
  };

  const onSearch = (username) => searchUsers({ variables: { username } });

  return (
    <Sidebar
      chatId={chatId}
      onSearch={onSearch}
      users={get(searchUsersData, "data.users")}
      directs={get(directs, "data.directs")}
      subscribeToNewMessage={subscribeToNewMessage}
      subscribeToNewDirect={subscribeToNewDirect}
      subscribeToDeleteMessage={subscribeToDeleteMessage}
      subscribeToDeleteDirect={subscribeToDeleteDirect}
      subscribeToOnlineUsers={subscribeToOnlineUsers}
      setOnline={setOnline}
      setOffline={setOffline}
      directslength={get(directs, "data.directs.length")}
    />
  );
};

export default React.memo(SidebarContainer);
