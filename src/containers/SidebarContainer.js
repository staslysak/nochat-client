import React from "react";
import {
  DIRECTS,
  DIRECT_LAST_MESSAGE,
  CURRENT_USER,
  USERS,
} from "graphql/queries";
import { DELETE_DIRECT, LOGOUT } from "graphql/mutations";
import {
  NEW_MESSAGE_SUBSCRIPTION,
  NEW_DIRECT_SUBSCRIPTION,
  DELETE_MESSAGE_SUBSCRIPTION,
  DELETE_DIRECT_SUBSCRIPTION,
  ONLINE_USER_SUBSCRIPTION,
  USER_TYPING_SUBSCRIPTION,
} from "graphql/subscriptions";
import { pasreQuery } from "utils/index";
import Sidebar from "components/Sidebar";
import { get } from "lodash-es";
import { sortByLastMessage, authTokens } from "utils/index";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { wsLink } from "client";

const SidebarContainer = (props) => {
  const { data: user } = useQuery(CURRENT_USER);
  const {
    data: directs,
    subscribeToMore: subscribeToMoreDirects,
    client,
  } = useQuery(DIRECTS);
  const [searchUsers, { data: users }] = useLazyQuery(USERS);
  const [deleteDirect] = useMutation(DELETE_DIRECT);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: async () => {
      wsLink.subscriptionClient.client.onclose();
      client.resetStore();
      authTokens.remove();
      props.history.push("/login");
    },
  });

  const [typings, setTypings] = React.useState({});
  const currentUser = get(user, "currentUser", {});
  const { p: chatId } = pasreQuery(props.location);

  React.useEffect(() => {
    wsLink.subscriptionClient.tryReconnect();
  }, []);

  const directSubscriptions = [
    (chatId) => {
      return subscribeToMoreDirects({
        document: USER_TYPING_SUBSCRIPTION,
        variables: { chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { userTyping } = subscriptionData.data;
          setTypings({ ...typings, [chatId]: userTyping });
          return prev;
        },
      });
    },
    (chatId) => {
      return subscribeToMoreDirects({
        document: NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { newMessage } = subscriptionData.data;
          const unread = newMessage.userId !== currentUser.id ? 1 : 0;

          const directs = prev.directs.map((direct) => {
            if (direct.id === chatId) {
              return {
                ...direct,
                lastMessage: newMessage,
                unread: direct.unread + unread,
              };
            }
            return direct;
          });

          return { directs };
        },
      });
    },
    (chatId) => {
      return subscribeToMoreDirects({
        document: DELETE_MESSAGE_SUBSCRIPTION,
        variables: { chatId },
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { deleteMessage } = subscriptionData.data;

          return await client
            .query({
              query: DIRECT_LAST_MESSAGE,
              variables: { chatId },
              fetchPolicy: "no-cache",
            })
            .then(({ data }) => {
              const directs = prev.directs.map((direct) => {
                const unread = deleteMessage.userId !== currentUser.id ? 1 : 0;

                if (direct.lastMessage.id === deleteMessage.id) {
                  return {
                    ...direct,
                    lastMessage: data.directLastMessage,
                    unread: direct.unread - unread,
                  };
                }

                return direct;
              });

              client.writeQuery({ query: DIRECTS, data: { directs } });

              return { directs };
            });
        },
      });
    },
  ];

  const subscribtions = [
    () => {
      return subscribeToMoreDirects({
        document: DELETE_DIRECT_SUBSCRIPTION,
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { deleteDirect } = subscriptionData.data;

          const directs = prev.directs.filter(
            ({ id }) => id !== deleteDirect.id
          );

          client.writeQuery({ query: DIRECTS, data: { directs } });

          return { directs };
        },
      });
    },
    () => {
      return subscribeToMoreDirects({
        document: NEW_DIRECT_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const directs = prev.directs.concat(subscriptionData.data.newDirect);
          return { directs };
        },
      });
    },
    () => {
      return subscribeToMoreDirects({
        document: ONLINE_USER_SUBSCRIPTION,
      });
    },
  ];

  React.useEffect(() => {
    const unsubscribes = subscribtions.map((subscribe) => subscribe());
    return () => unsubscribes.map((unsubscribe) => unsubscribe());
  }, [subscribtions]);

  const onSearch = (username) => searchUsers({ variables: { username } });

  const onDeleteDirect = (id) => {
    deleteDirect({ variables: { id } });
  };

  return (
    <Sidebar
      chatId={chatId}
      typings={typings}
      directs={get(directs, "directs", []).sort(sortByLastMessage)}
      users={get(users, "users")}
      currentUser={currentUser}
      onLogout={logout}
      onSearch={onSearch}
      onDeleteDirect={onDeleteDirect}
      directSubscriptions={directSubscriptions}
    />
  );
};

export default SidebarContainer;
