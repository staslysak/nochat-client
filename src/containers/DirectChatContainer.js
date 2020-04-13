import React from "react";
import {
  NEW_MESSAGE_SUBSCRIPTION,
  NEW_DIRECT_SUBSCRIPTION,
  DELETE_MESSAGE_SUBSCRIPTION,
  DELETE_DIRECT_SUBSCRIPTION,
  USER_TYPING_SUBSCRIPTION,
} from "graphql/subscriptions";
import { get } from "lodash-es";
import DirectChat from "components/DirectChat";
import { useDirectChatFetch, useTyping } from "hooks/index";

const DirectChatContainer = ({ userId }) => {
  const [state, setstate] = React.useState({
    hasMore: true,
  });

  const {
    queries: { currentUser, currentDirect },
    lazyQueries: {
      chatMessages: [chatMessages, chatMessagesData],
    },
    mutations: {
      createDirect,
      createMessage,
      deleteMessage,
      readMessage,
      userTyping,
    },
  } = useDirectChatFetch({ userId });

  const self = get(currentUser, "data.currentUser", {});
  const recipient = get(currentDirect, "data.currentDirect.recipient", {});
  const chatId = get(currentDirect, "data.currentDirect.direct.id");
  const messages = chatId ? get(chatMessagesData, "data.messages") : null;

  const [typingUser, onTyping] = useTyping(
    { chatId, username: self.username },
    (variables) => userTyping({ variables })
  );

  React.useEffect(() => {
    if (chatId) {
      chatMessages({ variables: { chatId } });
    }
  }, [userId, chatId, chatMessages]);

  const loadMoreMessages = () => {
    if (chatMessagesData.data && chatId && state.hasMore) {
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

  const subscribeToNewMessage = React.useCallback(() => {
    if (chatMessagesData.data && chatId)
      return chatMessagesData.subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { newMessage } = subscriptionData.data;

          return { messages: [newMessage, ...prev.messages] };
        },
      });

    return () => {};
  }, [chatMessagesData]);

  const subscribeToNewDirect = () => {
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
  };

  const subscribeToDeleteMessage = React.useCallback(() => {
    if (chatMessagesData.data && chatId)
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

    return () => {};
  }, [chatMessagesData]);

  const subscribeToDeleteDirect = React.useCallback(() => {
    if (chatId)
      return currentDirect.subscribeToMore({
        document: DELETE_DIRECT_SUBSCRIPTION,
        variables: { chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { deleteDirect } = subscriptionData.data;

          if (deleteDirect.id === chatId) {
            return { currentDirect: { ...prev.currentDirect, direct: null } };
          }

          return prev;
        },
      });

    return () => {};
  }, [currentDirect]);

  const subscribeToUserTyping = React.useCallback(() => {
    if (chatId)
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
    return () => {};
  }, [currentDirect]);

  const onCreateMessage = async (text) => {
    if (!chatId) {
      await createDirect({ variables: { text, userId: recipient.id } });
    } else {
      await createMessage({ variables: { text, chatId } });
      await userTyping({ variables: { chatId, username: "" } });
    }
  };

  const onDeleteMessage = (id) => () => {
    deleteMessage({ variables: { id } });
  };

  const onReadMessage = (id) => readMessage({ variables: { id } });

  return (
    <DirectChat
      user={self}
      chatId={chatId}
      recipient={recipient || {}}
      hasMore={state.hasMore}
      messages={messages}
      typingUser={typingUser.user === self.username ? "" : typingUser.user}
      onTyping={onTyping}
      onCreateMessage={onCreateMessage}
      onDeleteMessage={onDeleteMessage}
      onReadMessage={onReadMessage}
      onLoadMoreMessages={loadMoreMessages}
      subscribeToNewDirect={subscribeToNewDirect}
      subscribeToNewMessage={subscribeToNewMessage}
      subscribeToDeleteMessage={subscribeToDeleteMessage}
      subscribeToDeleteDirect={subscribeToDeleteDirect}
      subscribeToUserTyping={subscribeToUserTyping}
    />
  );
};

export default DirectChatContainer;
