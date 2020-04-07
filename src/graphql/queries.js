import gql from "graphql-tag";

export const USERS = gql`
  query users($username: String) {
    users(username: $username) {
      id
      email
      avatar
      online
      username
      lastSeen
      createdAt
    }
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
      avatar
      username
      createdAt
    }
  }
`;

export const DIRECTS = gql`
  query directs {
    directs {
      id
      user {
        id
        email
        avatar
        online
        username
        lastSeen
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

export const CURRENT_DIRECT = gql`
  query currentDirect($userId: Int!) {
    currentDirect(userId: $userId) {
      direct {
        id
        messages {
          id
          text
          userId
          unread
          createdAt
        }
      }
      recipient {
        id
        email
        avatar
        online
        username
        lastSeen
        createdAt
      }
    }
  }
`;

export const DIRECT_LAST_MESSAGE = gql`
  query directLastMessage($chatId: Int!) {
    directLastMessage(chatId: $chatId) {
      id
      text
      userId
      createdAt
    }
  }
`;

export const GET_ONLINE_USERS = gql`
  query onlineUsers {
    onlineUsers {
      id
    }
  }
`;
