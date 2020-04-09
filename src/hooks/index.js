import React from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { CURRENT_USER, CURRENT_DIRECT, USERS, DIRECTS } from "graphql/queries";
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
  const currentDirect = useQuery(CURRENT_DIRECT, { variables: { userId } });

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
    lazyQueries: {},
    mutations: {
      createDirect,
      createMessage,
      deleteMessage,
      readMessage,
      userTyping,
    },
  };
};

export const useTyping = ({ chatId, userId, username }, callback) => {
  const [state, setState] = React.useState({ timer: null, typing: false });
  const [user, setUser] = React.useState("");
  const typingUser = { user, setUser };
  const [debounce] = useDebouncedCallback(async (value) => {
    setState({ ...state, typing: false });
    await callback(value);
  }, 1500);

  const onTyping = async () => {
    setState({ ...state, typing: true });

    // const changeUsername = async () => {
    //   setState({ ...state, typing: false });
    //   await callback({ chatId, userId, username: "" });
    // };

    if (!state.typing) {
      await callback({ chatId, userId, username });
    }

    debounce({ chatId, userId, username: "" });
    // clearTimeout(state.timer);
    // setState({ ...state, timer: setTimeout(changeUsername, 1500) });
  };

  return [typingUser, onTyping];
};
