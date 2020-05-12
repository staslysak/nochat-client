import React from "react";
import DirectChat from "components/DirectChat";
import { useTyping } from "hooks/index";
import {
  DirectCreatedDocument,
  GetMessagesDocument,
  TypingUserDocument,
  DirectDeletedDocument,
  MessageCreatedDocument,
  MessageDeletedDocument,
  useCreateDirectMutation,
  useDeleteDirectMutation,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useReadMessageMutation,
  useTypeMessageMutation,
  useCurrentUserQuery,
  useCurrentDirectQuery,
  useGetMessagesQuery,
} from "graphql/generated.tsx";
import { errorHandler } from "utils/index";

const DirectChatContainer = ({ userId }) => {
  const [state, setstate] = React.useState({
    hasMore: true,
  });

  const currentUser = useCurrentUserQuery({ onError: errorHandler });
  const currentDirect = useCurrentDirectQuery({
    onError: errorHandler,
    variables: { userId },
    skip: !userId,
  });
  const [createDirect, { client }] = useCreateDirectMutation({
    onError: errorHandler,
  });
  const [deleteDirect] = useDeleteDirectMutation({ onError: errorHandler });
  const [createMessage] = useCreateMessageMutation({ onError: errorHandler });
  const [deleteMessage] = useDeleteMessageMutation({ onError: errorHandler });
  const [readMessage] = useReadMessageMutation({ onError: errorHandler });
  const [typeMessage] = useTypeMessageMutation();

  const self = currentUser?.data?.currentUser ?? {};
  const recipient = currentDirect?.data?.currentDirect?.recipient ?? {};
  const chatId = currentDirect?.data?.currentDirect?.direct?.id ?? null;

  const {
    data: messagesData,
    fetchMore,
    subscribeToMore: subscribeToMoreMessages,
  } = useGetMessagesQuery({
    onError: errorHandler,
    variables: { chatId },
    skip: !chatId,
  });

  const messages = chatId ? messagesData?.messages ?? [] : [];

  const [typingUser, onTyping] = useTyping(
    { chatId, username: self.username },
    (variables) => typeMessage({ variables })
  );

  const loadMoreMessages = () => {
    if (messagesData && state.hasMore && chatId) {
      fetchMore({
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

  React.useEffect(() => {
    const subscribtions = {
      messageCreated: () => {
        return subscribeToMoreMessages({
          document: MessageCreatedDocument,
          variables: { chatIds: [chatId] },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data || !prev) return prev;
            return {
              messages: [
                subscriptionData.data.messageCreated,
                ...prev.messages,
              ],
            };
          },
        });
      },
      messagesDeleted: () => {
        return subscribeToMoreMessages({
          document: MessageDeletedDocument,
          variables: { chatIds: [chatId] },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const messages = prev.messages.filter(
              (message) =>
                subscriptionData.data.messageDeleted.ids !== message.id
            );

            client.writeQuery({
              query: GetMessagesDocument,
              data: { messages },
            });

            return { messages };
          },
        });
      },
    };

    const messageCreated = subscribtions.messageCreated();
    const messageDeleted = subscribtions.messagesDeleted();

    return () => {
      messageCreated();
      messageDeleted();
    };
  }, [subscribeToMoreMessages, chatId]);

  React.useEffect(() => {
    const subscribtions = {
      directCreated: () =>
        currentDirect.subscribeToMore({
          document: DirectCreatedDocument,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            return {
              currentDirect: {
                ...prev.currentDirect,
                direct: subscriptionData.data.direct,
              },
            };
          },
        }),
      directDeleted: () =>
        currentDirect.subscribeToMore({
          document: DirectDeletedDocument,
          updateQuery: (prev, { subscriptionData }) => {
            if (
              !subscriptionData.data ||
              subscriptionData.data.direct.id !== chatId
            ) {
              return prev;
            }

            return { currentDirect: { ...prev.currentDirect, direct: null } };
          },
        }),
    };

    const directCreated = subscribtions.directCreated();
    const directDeleted = subscribtions.directDeleted();
    return () => {
      directCreated();
      directDeleted();
    };
  }, [currentDirect, chatId]);

  React.useEffect(() => {
    const subscribe = () => {
      if (chatId) {
        return currentDirect.subscribeToMore({
          document: TypingUserDocument,
          variables: { chatId },
          updateQuery: (prev, { subscriptionData }) => {
            if (subscriptionData.data) {
              typingUser.setUser(subscriptionData.data.typingUser);
            }

            return prev;
          },
        });
      }
      return () => {};
    };
    const unsubscribe = subscribe();
    return unsubscribe;
  }, [currentDirect, chatId]);

  const onCreateMessage = async (text) => {
    if (!chatId) {
      await createDirect({ variables: { text, userId: recipient.id } });
    } else {
      await createMessage({ variables: { text, chatId } });
      await typeMessage({ variables: { chatId, username: "" } });
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
      recipient={recipient}
      hasMore={state.hasMore}
      messages={messages}
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
