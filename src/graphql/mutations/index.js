import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

export const VERIFY_USER = gql`
  mutation($secret: String!) {
    verifyUser(secret: $secret) {
      token
      refreshToken
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name)
  }
`;

export const CREATE_DIRECT = gql`
  mutation($userId: Int!, $text: String!) {
    createDirect(userId: $userId, text: $text) {
      id
      user {
        id
        email
        avatar
        username
        createdAt
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($chatId: Int, $text: String!) {
    createMessage(chatId: $chatId, text: $text)
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
