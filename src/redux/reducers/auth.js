import TYPES from "redux/actions/types";

const INITIAL_STATE = {
  isAuthorized: !!localStorage.getItem("token"),
  user: {},
  directs: [],
  activeChat: {
    user: {},
    messages: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.auth.LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isAuthorized: true
      };
    case TYPES.auth.USER:
      return {
        ...state,
        user: action.payload.user
      };
    case TYPES.auth.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isAuthorized: false
      };
    case TYPES.auth.ACTIVE_CHAT:
      let activeDirect = state.directs.filter(({ user }) => {
        if (action.payload.user.username === user.username) return true;
        return false;
      });

      if (activeDirect.length) {
        activeDirect = activeDirect[0].id;
      } else {
        activeDirect = null;
      }

      return {
        ...state,
        activeChat: { ...state.activeChat, ...action.payload, activeDirect }
      };
    case TYPES.auth.DIRECTS:
      return {
        ...state,
        directs: action.payload
      };
    default:
      return { ...state };
  }
};
