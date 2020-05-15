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
  useGetMessagesQuery,
} from "graphql/generated.tsx";
import { useDispatch } from "react-redux";
import { dispatchSetTyping } from "store";
import { useGetCurrentDirectQuery } from "graphql/generated";

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
  });
  const [createDirect] = useCreateDirectMutation({ onError });
  const [deleteDirect] = useDeleteDirectMutation({ onError });
  const [createMessage] = useCreateMessageMutation({ onError });
  const [deleteMessage] = useDeleteMessageMutation({ onError });
  const [readMessage] = useReadMessageMutation({ onError });
  const [typeMessage] = useTypeMessageMutation();
  const recipient = currentDirect?.data?.recipient ?? {};
  const chatId = currentDirect?.data?.direct?.id ?? null;

  const messagesData = useGetMessagesQuery({
    onError,
    skip: !chatId,
    variables: { chatId },
    notifyOnNetworkStatusChange: true,
  });

  const messages = messagesData.data?.messages ?? [];

  useEffect(() => {
    setState((prev) => ({ ...prev, hasMore: true }));
  }, [userId]);

  const loadMoreMessages = () => {
    if (messages.length && state.hasMore && chatId && !messagesData.loading) {
      messagesData.fetchMore({
        variables: { chatId, offset: messages.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (fetchMoreResult.messages.length < state.limit) {
            setState((prev) => ({ ...prev, hasMore: false }));
          }

          return {
            messages: [...prev.messages, ...fetchMoreResult.messages],
          };
        },
      });
    }
  };

  useEffect(() => {
    const subscribtions = {
      messageCreated: () => {
        return messagesData.subscribeToMore({
          document: MessageCreatedDocument,
          variables: { chatIds: [chatId] },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
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
        return messagesData.subscribeToMore({
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
  }, [messagesData.subscribeToMore, chatId]);

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
    };

    const directCreated = subscribtions.directCreated();
    const directDeleted = subscribtions.directDeleted();
    return () => {
      directCreated();
      directDeleted();
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
