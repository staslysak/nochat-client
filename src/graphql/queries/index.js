import gql from "graphql-tag";

export const USERS = gql`
  query users($username: String) {
    users(username: $username) {
      id
      email
      avatar
      username
      createdAt
    }
  }
`;

export const USER = gql`
  {
    user {
      id
      email
      avatar
      username
      createdAt
    }
  }
`;

export const DIRECTS = gql`
  {
    directs {
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

export const DIRECT = gql`
  query direct($userId: Int!) {
    direct(userId: $userId) {
      direct {
        id
        messages {
          id
          text
          userId
          createdAt
        }
      }
      recipient {
        id
        email
        avatar
        username
        createdAt
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  query deleteMessage($id: Int!) {
    deleteMessage(id: $id)
  }
`;

export const NEW_MESSAGE = gql`
  subscription($chatId: Int!) {
    newMessage(chatId: $chatId) {
      id
      text
      userId
      createdAt
    }
  }
`;
