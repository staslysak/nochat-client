import gql from "graphql-tag";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription($chatId: Int!) {
    newMessage(chatId: $chatId) {
      id
      text
      userId
      unread
      createdAt
    }
  }
`;

export const DELETE_MESSAGE_SUBSCRIPTION = gql`
  subscription($chatId: Int!) {
    deleteMessage(chatId: $chatId) {
      id
      userId
    }
  }
`;

export const DELETE_DIRECT_SUBSCRIPTION = gql`
  subscription deleteDirect {
    deleteDirect {
      id
    }
  }
`;

export const NEW_DIRECT_SUBSCRIPTION = gql`
  subscription {
    newDirect {
      id
      user {
        id
        email
        avatar
        username
        createdAt
      }
      lastMessage {
        id
        text
        userId
        createdAt
      }
      unread
    }
  }
`;

export const ONLINE_USER_SUBSCRIPTION = gql`
  subscription {
    onlineUser {
      id
      online
      lastSeen
    }
  }
`;
