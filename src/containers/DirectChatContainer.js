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
  const {
    queries: { currentUser, currentDirect },
    mutations: {
      createDirect,
      createMessage,
      deleteMessage,
      readMessage,
      userTyping,
    },
  } = useDirectChatFetch({ userId });

  const direct = get(currentDirect, "data.currentDirect.direct", {});
  const recipient = get(currentDirect, "data.currentDirect.recipient", {});

  const [typingUser, onTyping] = useTyping(
    {
      chatId: get(direct, "id"),
      username: get(currentUser, "data.currentUser", {}).username,
    },
    (variables) => userTyping({ variables })
  );

  const subscribeToNewMessage = (chatId) => {
    return currentDirect.subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data;
        console.log(newMessage);

        return {
          currentDirect: {
            ...prev.currentDirect,
            direct: {
              ...prev.currentDirect.direct,
              messages: [...prev.currentDirect.direct.messages, newMessage],
            },
          },
        };
      },
    });
  };

  const subscribeToNewDirect = () => {
    return currentDirect.subscribeToMore({
      document: NEW_DIRECT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newDirect } = subscriptionData.data;

        // const messages = [newDirect.lastMessage];

        return {
          currentDirect: {
            ...prev.currentDirect,
            direct: newDirect,
            // direct: { ...newDirect, messages },
          },
        };
      },
    });
  };

  const subscribeToDeleteMessage = (chatId) => {
    return currentDirect.subscribeToMore({
      document: DELETE_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { deleteMessage } = subscriptionData.data;

        const messages = prev.currentDirect.direct.messages.filter(
          (message) => message.id !== deleteMessage.id
        );

        return {
          currentDirect: {
            ...prev.currentDirect,
            direct: { ...prev.currentDirect.direct, messages },
          },
        };
      },
    });
  };

  const subscribeToDeleteDirect = (chatId) => {
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
  };

  const subscribeToUserTyping = (chatId) => {
    return currentDirect.subscribeToMore({
      document: USER_TYPING_SUBSCRIPTION,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { userTyping } = subscriptionData.data;
        // setTypingUser(userTyping);
        typingUser.setUser(userTyping);

        // if (deleteDirect.id === chatId) {
        //   return {
        //     currentDirect: { ...prev.currentDirect, direct: null },
        //   };
        // }

        return prev;
      },
    });
  };

  const onCreateMessage = async (text) => {
    if (!direct) {
      await createDirect({ variables: { text, userId: recipient.id } });
    } else {
      await createMessage({ variables: { text, chatId: direct.id } });
      await userTyping({
        variables: {
          chatId: get(direct, "id"),
          username: "",
        },
      });
    }
  };

  const onDeleteMessage = (id) => () => {
    deleteMessage({ variables: { id } });
  };

  return (
    <DirectChat
      user={get(currentUser, "data.currentUser", {})}
      show={!!userId}
      chatId={get(direct, "id")}
      recipient={recipient}
      messages={get(direct, "messages")}
      typingUser={
        typingUser.user === get(currentUser, "data.currentUser", {}).username
          ? ""
          : typingUser.user
      }
      onTyping={onTyping}
      onCreateMessage={onCreateMessage}
      onDeleteMessage={onDeleteMessage}
      onReadMessage={(id) => readMessage({ variables: { id } })}
      subscribeToNewDirect={subscribeToNewDirect}
      subscribeToNewMessage={subscribeToNewMessage}
      subscribeToDeleteMessage={subscribeToDeleteMessage}
      subscribeToDeleteDirect={subscribeToDeleteDirect}
      subscribeToUserTyping={subscribeToUserTyping}
    />
  );
};

export default DirectChatContainer;
