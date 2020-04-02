import TYPES from "redux/actions/types";

const INITIAL_STATE = {
  isAuthorized: !!localStorage.getItem("token"),
  chatId: null,
  text: ""
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.auth.LOGIN:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        isAuthorized: true
      };
    case TYPES.auth.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isAuthorized: false
      };
    case TYPES.auth.TYPE_MESSAGE:
      return { ...state, text: payload };
    case TYPES.auth.CHAT_ID:
      return { ...state, chatId: payload };
    default:
      return { ...state };
  }
};
