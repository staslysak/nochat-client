import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($secret: String!) {
    verifyUser(secret: $secret) {
      token
      refreshToken
    }
  }
`;

export const CREATE_DIRECT = gql`
  mutation createDirect($userId: Int!, $text: String) {
    createDirect(userId: $userId, text: $text) {
      id
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($chatId: Int, $text: String!) {
    createMessage(chatId: $chatId, text: $text)
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: Int!) {
    deleteMessage(id: $id)
  }
`;

export const DELETE_DIRECT = gql`
  mutation deleteDirect($id: Int!) {
    deleteDirect(id: $id)
  }
`;

export const READ_MESSAGE = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id)
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const SET_ONLINE = gql`
  mutation connect {
    connect {
      id
    }
  }
`;

export const SET_OFFLINE = gql`
  mutation disconnect {
    disconnect {
      id
    }
  }
`;

export const USER_TYPING = gql`
  mutation userTyping($chatId: Int!, $username: String) {
    userTyping(chatId: $chatId, username: $username)
  }
`;
