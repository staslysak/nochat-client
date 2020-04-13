import React from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  CURRENT_USER,
  CURRENT_DIRECT,
  USERS,
  DIRECTS,
  CHAT_MESSAGES,
} from "graphql/queries";
import {
  SET_OFFLINE,
  SET_ONLINE,
  CREATE_DIRECT,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  DELETE_DIRECT,
  READ_MESSAGE,
  USER_TYPING,
  LOGOUT,
} from "graphql/mutations";
import { useDebouncedCallback } from "use-debounce";
import { store } from "redux/store";
import { dispatchLogout } from "redux/actions";

export const useSibebarFetch = () => {
  const user = useQuery(CURRENT_USER);
  const directs = useQuery(DIRECTS);

  const searchUsers = useLazyQuery(USERS);

  const [connect] = useMutation(SET_ONLINE);
  const [disconnect] = useMutation(SET_OFFLINE);
  const [deleteDirect] = useMutation(DELETE_DIRECT);
  const [logout, { client }] = useMutation(LOGOUT, {
    onCompleted: async () => {
      await disconnect();
      // console.log(store.dispatch());
      await store.dispatch(dispatchLogout());
      await client.resetStore();
    },
  });

  return {
    queries: {
      user,
      directs,
    },
    lazyQueries: {
      searchUsers,
    },
    mutations: {
      logout,
      connect,
      disconnect,
      deleteDirect,
    },
  };
};

export const useDirectChatFetch = ({ userId }) => {
  const currentUser = useQuery(CURRENT_USER);
  const currentDirect = useQuery(CURRENT_DIRECT, {
    variables: { userId },
    // fetchPolicy: "network-only",
  });
  const chatMessages = useLazyQuery(CHAT_MESSAGES, {
    fetchPolicy: "network-only",
  });

  const [createDirect] = useMutation(CREATE_DIRECT);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [readMessage] = useMutation(READ_MESSAGE);
  const [userTyping] = useMutation(USER_TYPING);

  return {
    queries: {
      currentUser,
      currentDirect,
    },
    lazyQueries: {
      chatMessages,
    },
    mutations: {
      createDirect,
      createMessage,
      deleteMessage,
      readMessage,
      userTyping,
    },
  };
};

export const useTyping = (data, callback) => {
  const [typing, setTyping] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [debounce] = useDebouncedCallback(async (value) => {
    setTyping(false);
    await callback(value);
  }, 1000);

  const onTyping = async () => {
    setTyping(true);

    if (!typing) await callback(data);

    debounce({ ...data, username: "" });
  };

  return [{ user, setUser }, onTyping];
};

export const usePrev = (values) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = values;
  }, [values]);

  return ref.current;
};
