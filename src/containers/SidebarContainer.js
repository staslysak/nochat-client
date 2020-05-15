import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDebouncedCallback as useDebounce } from "use-debounce";
import Sidebar from "components/Sidebar";
import { pasreQuery } from "utils/index";
import {
  dispatchSetTyping,
  useDispatch,
  useSelector,
  dispatchSetUser,
} from "store";
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
  useCurrentUserQuery,
} from "graphql/generated.tsx";

const SidebarContainer = () => {
  useCurrentUserQuery({
    onCompleted: (data) => dispatch(dispatchSetUser(data.self)),
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const self = useSelector((store) => store.user);
  const { data: directs, subscribeToMore, client } = useDirectsQuery();
  const [searchUsers, { data: users }] = useUsersLazyQuery();
  const { p: chatId } = pasreQuery(location);

  const directSubscription = (chatId) =>
    subscribeToMore({
      document: TypingUserDocument,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        dispatch(
          dispatchSetTyping({
            [chatId]: subscriptionData.data.typingUser,
          })
        );
        return prev;
      },
    });

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
              const unread = messageCreated.userId !== self.id ? 1 : 0;
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

  const [debounceSearch] = useDebounce((username) => {
    searchUsers({ variables: { username } });
  }, 300);

  return (
    <Sidebar
      chatId={chatId}
      chats={directs?.directs ?? []}
      users={users?.users ?? []}
      self={self}
      onSearch={debounceSearch}
      directSubscription={directSubscription}
    />
  );
};

export default SidebarContainer;
