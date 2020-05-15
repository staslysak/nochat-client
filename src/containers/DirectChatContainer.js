import React, { useState, useEffect } from "react";
import DirectChat from "components/DirectChat";
import { errorHandler as onError } from "utils/index";
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
  useGetCurrentDirectQuery,
} from "graphql/generated.tsx";
import { useDispatch } from "react-redux";
import { dispatchSetTyping } from "store";

const DirectChatContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    limit: 20,
    hasMore: true,
  });
  const { client, ...currentDirect } = useGetCurrentDirectQuery({
    onError,
    skip: !userId,
    variables: { userId },
    notifyOnNetworkStatusChange: true,
  });
  const [createDirect] = useCreateDirectMutation({ onError });
  const [deleteDirect] = useDeleteDirectMutation({ onError });
  const [createMessage] = useCreateMessageMutation({ onError });
  const [deleteMessage] = useDeleteMessageMutation({ onError });
  const [readMessage] = useReadMessageMutation({ onError });
  const [typeMessage] = useTypeMessageMutation();
  const recipient = currentDirect.data?.recipient ?? {};
  const chatId = currentDirect.data?.direct?.id ?? null;
  const messages = currentDirect.data?.direct?.messages ?? [];

  useEffect(() => {
    setState((prev) => ({ ...prev, hasMore: true }));
  }, [userId]);

  const loadMoreMessages = () => {
    if (messages.length && state.hasMore && chatId && !currentDirect.loading) {
      currentDirect.fetchMore({
        query: GetMessagesDocument,
        variables: { chatId, offset: messages.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (fetchMoreResult.messages.length < state.limit) {
            setState((prev) => ({ ...prev, hasMore: false }));
          }

          return {
            ...prev,
            direct: {
              ...prev.direct,
              messages: [...prev.direct.messages, ...fetchMoreResult.messages],
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    const subscribtions = {
      directCreated: () =>
        currentDirect.subscribeToMore({
          document: DirectCreatedDocument,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return {
              ...prev,
              direct: subscriptionData.data.direct,
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

            return { ...prev, direct: null };
          },
        }),
      messageCreated: () => {
        return currentDirect.subscribeToMore({
          document: MessageCreatedDocument,
          variables: { chatIds: [chatId] },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return {
              ...prev,
              direct: {
                ...prev.direct,
                messages: [
                  subscriptionData.data.messageCreated,
                  ...prev.direct.messages,
                ],
              },
            };
          },
        });
      },
      messagesDeleted: () => {
        return currentDirect.subscribeToMore({
          document: MessageDeletedDocument,
          variables: { chatIds: [chatId] },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const messages = prev.direct.messages.filter(
              (message) =>
                subscriptionData.data.messageDeleted.ids !== message.id
            );

            return { ...prev, direct: { ...prev.direct, messages } };
          },
        });
      },
    };

    const directCreated = subscribtions.directCreated();
    const directDeleted = subscribtions.directDeleted();
    const messageCreated = subscribtions.messageCreated();
    const messageDeleted = subscribtions.messagesDeleted();

    return () => {
      directCreated();
      directDeleted();
      messageCreated();
      messageDeleted();
    };
  }, [currentDirect, chatId]);

  useEffect(() => {
    const subscribe = () => {
      if (chatId) {
        return currentDirect.subscribeToMore({
          document: TypingUserDocument,
          variables: { chatId },
          updateQuery: (prev, { subscriptionData }) => {
            if (subscriptionData.data) {
              dispatch(
                dispatchSetTyping({
                  [chatId]: subscriptionData.data.typingUser,
                })
              );
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
      return await createDirect({ variables: { text, userId: recipient.id } });
    } else {
      return await createMessage({ variables: { text, chatId } }).then(() =>
        typeMessage({ variables: { chatId, username: "" } })
      );
    }
  };

  const onDeleteMessage = (id) => async () => {
    if (messages?.length === 1) {
      await deleteDirect({ variables: { id: chatId } });
    } else {
      await deleteMessage({ variables: { id } });
    }
  };

  const onReadMessage = (id) => readMessage({ variables: { id } });

  return (
    <DirectChat
      chatId={chatId}
      recipient={recipient}
      messages={messages}
      onCreateMessage={onCreateMessage}
      onDeleteMessage={onDeleteMessage}
      onReadMessage={onReadMessage}
      onLoadMoreMessages={loadMoreMessages}
    />
  );
};

export default DirectChatContainer;
