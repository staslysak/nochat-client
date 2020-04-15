import React from "react";
import {
  NEW_MESSAGE_SUBSCRIPTION,
  NEW_DIRECT_SUBSCRIPTION,
  DELETE_MESSAGE_SUBSCRIPTION,
  DELETE_DIRECT_SUBSCRIPTION,
  USER_TYPING_SUBSCRIPTION,
} from "graphql/subscriptions";
import { CURRENT_USER, CURRENT_DIRECT, CHAT_MESSAGES } from "graphql/queries";
import {
  CREATE_DIRECT,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  DELETE_DIRECT,
  READ_MESSAGE,
  USER_TYPING,
} from "graphql/mutations";
import { get } from "lodash-es";
import DirectChat from "components/DirectChat";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useTyping } from "hooks/index";

const DirectChatContainer = ({ userId }) => {
  const [state, setstate] = React.useState({
    hasMore: true,
  });

  const currentUser = useQuery(CURRENT_USER);
  const currentDirect = useQuery(CURRENT_DIRECT, { variables: { userId } });
  const [chatMessages, chatMessagesData] = useLazyQuery(CHAT_MESSAGES);
  const [createDirect] = useMutation(CREATE_DIRECT);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [deleteDirect] = useMutation(DELETE_DIRECT);
  const [readMessage] = useMutation(READ_MESSAGE);
  const [userTyping] = useMutation(USER_TYPING);

  const self = get(currentUser, "data.currentUser", {});
  const recipient = get(currentDirect, "data.currentDirect.recipient", {});
  const chatId = get(currentDirect, "data.currentDirect.direct.id");
  const messages = chatId ? get(chatMessagesData, "data.messages") : [];

  const [typingUser, onTyping] = useTyping(
    { chatId, username: self.username },
    (variables) => userTyping({ variables })
  );

  React.useEffect(() => {
    if (chatId && userId) {
      chatMessages({ variables: { chatId } });
    }
  }, [userId, chatId, chatMessages]);

  const loadMoreMessages = () => {
    if (chatMessagesData.data && state.hasMore && chatId) {
      chatMessagesData.fetchMore({
        variables: { chatId, offset: messages.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          const limit = 20;

          if (!fetchMoreResult) return prev;

          if (fetchMoreResult.messages.length < limit) {
            setstate({ hasMore: false });
          }

          return {
            messages: [...prev.messages, ...fetchMoreResult.messages],
          };
        },
      });
    }
  };

  const subscribtions = [
    () => {
      try {
        if (chatId) {
          return chatMessagesData.subscribeToMore({
            document: NEW_MESSAGE_SUBSCRIPTION,
            variables: { chatId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { newMessage } = subscriptionData.data;

              return { messages: [newMessage, ...prev.messages] };
            },
          });
        } else {
          return () => {};
        }
      } catch (error) {
        return () => {};
      }
    },

    () => {
      try {
        if (chatId) {
          return chatMessagesData.subscribeToMore({
            document: DELETE_MESSAGE_SUBSCRIPTION,
            variables: { chatId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { deleteMessage } = subscriptionData.data;

              const messages = prev.messages.filter(
                ({ id }) => id !== deleteMessage.id
              );

              return { messages };
            },
          });
        } else {
          return () => {};
        }
      } catch (error) {
        return () => {};
      }
    },
    () => {
      try {
        if (chatId) {
          return currentDirect.subscribeToMore({
            document: DELETE_DIRECT_SUBSCRIPTION,
            variables: { chatId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { deleteDirect } = subscriptionData.data;

              if (deleteDirect.id === chatId) {
                return {
                  currentDirect: { ...prev.currentDirect, direct: null },
                };
              }

              return prev;
            },
          });
        } else {
          return () => {};
        }
      } catch (error) {
        return () => {};
      }
    },
    () => {
      try {
        if (chatId) {
          return currentDirect.subscribeToMore({
            document: USER_TYPING_SUBSCRIPTION,
            variables: { chatId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { userTyping } = subscriptionData.data;

              typingUser.setUser(userTyping);

              return prev;
            },
          });
        } else {
          return () => {};
        }
      } catch (error) {
        return () => {};
      }
    },
  ];

  React.useEffect(() => {
    const unsubscribes = subscribtions.map((subscribe) => subscribe());
    return () => unsubscribes.map((unsubscribe) => unsubscribe());
  }, [subscribtions]);

  React.useEffect(() => {
    const subscribeToNewDirect = () => {
      try {
        return currentDirect.subscribeToMore({
          document: NEW_DIRECT_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { newDirect } = subscriptionData.data;

            return {
              currentDirect: { ...prev.currentDirect, direct: newDirect },
            };
          },
        });
      } catch (error) {
        return () => {};
      }
    };

    const unsubsribe = subscribeToNewDirect();
    return () => unsubsribe();
  }, [currentDirect]);

  const onCreateMessage = async (text) => {
    if (!chatId) {
      await createDirect({ variables: { text, userId: recipient.id } });
    } else {
      await createMessage({ variables: { text, chatId } });
      await userTyping({ variables: { chatId, username: "" } });
    }
  };

  const onDeleteMessage = (id) => async () => {
    if (messages && messages.length === 1) {
      await deleteDirect({ variables: { id: chatId } });
    } else {
      await deleteMessage({ variables: { id } });
    }
  };

  const onReadMessage = (id) => readMessage({ variables: { id } });

  return (
    <DirectChat
      user={self}
      chatId={chatId}
      recipient={recipient || {}}
      hasMore={state.hasMore}
      messages={messages || []}
      typingUser={typingUser.user === self.username ? "" : typingUser.user}
      onTyping={onTyping}
      onCreateMessage={onCreateMessage}
      onDeleteMessage={onDeleteMessage}
      onReadMessage={onReadMessage}
      onLoadMoreMessages={loadMoreMessages}
    />
  );
};

export default DirectChatContainer;
