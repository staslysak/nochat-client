import React from "react";
// import { get } from "lodash-es";
import DirectChat from "components/DirectChat";
import { useTyping } from "hooks/index";
import {
  SubNewDirectDocument,
  SubUserTypingDocument,
  SubDeleteDirectDocument,
  SubNewMessageDocument,
  SubDeleteMessageDocument,
  useCreateDirectMutation,
  useDeleteDirectMutation,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useReadMessageMutation,
  useUserTypingMutation,
  useCurrentUserQuery,
  useCurrentDirectQuery,
  useGetChatMessagesQuery,
} from "graphql/generated.tsx";

const DirectChatContainer = ({ userId }) => {
  const [state, setstate] = React.useState({
    hasMore: true,
  });

  const currentUser = useCurrentUserQuery();
  const currentDirect = useCurrentDirectQuery({
    variables: { userId },
    skip: !userId,
  });
  const [createDirect] = useCreateDirectMutation();
  const [deleteDirect] = useDeleteDirectMutation();
  const [createMessage] = useCreateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [readMessage] = useReadMessageMutation();
  const [userTyping] = useUserTypingMutation();

  const self = currentUser?.data?.currentUser ?? {};
  const recipient = currentDirect?.data?.currentDirect?.recipient ?? {};
  const chatId = currentDirect?.data?.currentDirect?.direct?.id ?? null;

  const chatMessagesData = useGetChatMessagesQuery({
    variables: { chatId },
    skip: !chatId,
  });

  const messages = chatId ? chatMessagesData?.data?.messages : [];

  const [typingUser, onTyping] = useTyping(
    { chatId, username: self.username },
    (variables) => userTyping({ variables })
  );

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

  React.useEffect(() => {
    const subscribeToNewMessage = () => {
      try {
        return chatMessagesData.subscribeToMore({
          document: SubNewMessageDocument,
          variables: { chatId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { newMessage } = subscriptionData.data;

            return { messages: [newMessage, ...prev.messages] };
          },
        });
      } catch (error) {
        return () => {};
      }
    };

    const unsubsribe = subscribeToNewMessage();
    return () => unsubsribe();
  }, [chatMessagesData.data, chatId]);

  React.useEffect(() => {
    const subscribeToNewDirect = () => {
      try {
        return currentDirect.subscribeToMore({
          document: SubNewDirectDocument,
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

  React.useEffect(() => {
    const subscribeToDeleteMessage = () => {
      try {
        return chatMessagesData.subscribeToMore({
          document: SubDeleteMessageDocument,
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
      } catch (error) {
        return () => {};
      }
    };

    const unsubsribe = subscribeToDeleteMessage();
    return () => unsubsribe();
  }, [chatMessagesData.data, chatId]);

  React.useEffect(() => {
    const subscribeToDeleteDirect = () => {
      try {
        return currentDirect.subscribeToMore({
          document: SubDeleteDirectDocument,
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
      } catch (error) {
        return () => {};
      }
    };

    const unsubsribe = subscribeToDeleteDirect();
    return () => unsubsribe();
  }, [currentDirect, chatId]);

  React.useEffect(() => {
    const subscribeToUserTyping = () => {
      try {
        return currentDirect.subscribeToMore({
          document: SubUserTypingDocument,
          variables: { chatId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { userTyping } = subscriptionData.data;

            typingUser.setUser(userTyping);

            return prev;
          },
        });
      } catch (error) {
        return () => {};
      }
    };

    const unsubsribe = subscribeToUserTyping();
    return () => unsubsribe();
  }, [currentDirect, chatId]);

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
