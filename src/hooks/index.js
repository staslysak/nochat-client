import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { CURRENT_USER, CURRENT_DIRECT, USERS, DIRECTS } from "graphql/queries";
import {
  SET_OFFLINE,
  SET_ONLINE,
  CREATE_DIRECT,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  READ_MESSAGE,
} from "graphql/mutations";

export const useSibebarFetch = () => {
  const user = useQuery(CURRENT_USER);
  const directs = useQuery(DIRECTS);

  const searchUsers = useLazyQuery(USERS);

  const [setOnline] = useMutation(SET_ONLINE);
  const [setOffline] = useMutation(SET_OFFLINE);

  return {
    queries: {
      user,
      directs,
    },
    lazyQueries: {
      searchUsers,
    },
    mutations: {
      setOnline,
      setOffline,
    },
  };
};

export const useDirectChatFetch = ({ userId }) => {
  const currentUser = useQuery(CURRENT_USER);
  const currentDirect = useQuery(CURRENT_DIRECT, { variables: { userId } });

  const [createDirect] = useMutation(CREATE_DIRECT);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [readMessage] = useMutation(READ_MESSAGE);

  return {
    queries: {
      currentUser,
      currentDirect,
    },
    lazyQueries: {},
    mutations: {
      createDirect,
      createMessage,
      deleteMessage,
      readMessage,
    },
  };
};
