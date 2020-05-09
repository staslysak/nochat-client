import React from "react";
import { pasreQuery } from "utils/index";
import Sidebar from "components/Sidebar";
import { get } from "lodash-es";
import { sortByLastMessage, authTokens } from "utils/index";
import { wsLink } from "client";
import {
  SubNewDirectDocument,
  SubDeleteDirectDocument,
  SubNewMessageDocument,
  SubDeleteMessageDocument,
  SubOnlineUserDocument,
  SubUserTypingDocument,
  DirectsDocument,
  DirectLastMessageDocument,
  useUsersLazyQuery,
  useDirectsQuery,
  useDeleteDirectMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} from "graphql/generated.tsx";

const SidebarContainer = (props) => {
  const { data: user } = useCurrentUserQuery();
  const { data: directs, subscribeToMore, client } = useDirectsQuery();
  const [searchUsers, { data: users }] = useUsersLazyQuery();
  const [deleteDirect] = useDeleteDirectMutation();
  const [logout] = useLogoutMutation({
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
      return subscribeToMore({
        document: SubUserTypingDocument,
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
      return subscribeToMore({
        document: SubNewMessageDocument,
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
      return subscribeToMore({
        document: SubDeleteMessageDocument,
        variables: { chatId },
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { deleteMessage } = subscriptionData.data;

          return await client
            .query({
              query: DirectLastMessageDocument,
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

              client.writeQuery({ query: DirectsDocument, data: { directs } });

              return { directs };
            });
        },
      });
    },
  ];

  const subscribtions = [
    () => {
      return subscribeToMore({
        document: SubDeleteDirectDocument,
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { deleteDirect } = subscriptionData.data;

          const directs = prev.directs.filter(
            ({ id }) => id !== deleteDirect.id
          );

          client.writeQuery({ query: DirectsDocument, data: { directs } });

          return { directs };
        },
      });
    },
    () => {
      return subscribeToMore({
        document: SubNewDirectDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const directs = prev.directs.concat(subscriptionData.data.newDirect);
          return { directs };
        },
      });
    },
    () => subscribeToMore({ document: SubOnlineUserDocument }),
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
