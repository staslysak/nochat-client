import React from "react";
import { USER, DIRECT, NEW_MESSAGE } from "graphql/queries";
import { CREATE_DIRECT, CREATE_MESSAGE } from "graphql/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { get } from "lodash-es";
import DirectChat from "components/DirectChat";

const DirectChatContainer = ({ userId }) => {
  const userData = useQuery(USER);
  const user = get(userData, "data.user", {});

  const directData = useQuery(DIRECT, { variables: { userId } });
  const direct = get(directData, "data.direct.direct", {});
  const recipient = get(directData, "data.direct.recipient", {});

  const [createDirect] = useMutation(CREATE_DIRECT);
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const subscribeToNewMessage = chatId => {
    return directData.subscribeToMore({
      document: NEW_MESSAGE,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          direct: {
            ...prev.direct,
            direct: {
              ...prev.direct.direct,
              messages: [
                ...prev.direct.direct.messages,
                subscriptionData.data.newMessage
              ]
            }
          }
        };
      }
    });
  };

  const onCreateMessage = text => {
    if (!direct) {
      createDirect({ variables: { userId: recipient.id, text } });
    } else {
      createMessage({ variables: { text, chatId: direct.id } });
    }
  };

  return (
    <DirectChat
      show={!!userId}
      chatId={direct.id}
      user={user}
      recipient={recipient}
      messages={direct.messages}
      onCreateMessage={onCreateMessage}
      subscribeToNewMessage={subscribeToNewMessage}
    />
  );
};

export default DirectChatContainer;
