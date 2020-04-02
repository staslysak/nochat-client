export const USER_FRAGMENT = `
  id
  email
  avatar
  username
  createdAt
`;

export const MESSAGE_FRAGMENT = `
  id
  text
  user {
    id
  }
  createdAt
`;
