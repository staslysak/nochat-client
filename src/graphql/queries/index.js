import gql from "graphql-tag";

export const USERS = gql`
  query users($username: String) {
    users(username: $username) {
      id
      avatar
      username
    }
  }
`;

export const USER = gql`
  {
    user {
      id
      email
      username
      avatar
    }
  }
`;

export const DIRECTS = gql`
  {
    directs {
      id
      user {
        id
        avatar
        username
      }
      lastMessage {
        text
        user {
          id
        }
        createdAt
      }
    }
  }
`;

export const DIRECT = gql`
  query direct($userId: Int!) {
    direct(userId: $userId) {
      user {
        id
        avatar
        username
        createdAt
      }
      messages {
        text
        user {
          id
        }
        createdAt
      }
    }
  }
`;
