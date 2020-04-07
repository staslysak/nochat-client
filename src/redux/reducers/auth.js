import TYPES from "redux/actions/types";
import { authTokens } from "redux/actions/auth";

const INITIAL_STATE = {
  isAuthorized: !!localStorage.getItem("token"),
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.auth.LOGIN:
      authTokens.set(payload);
      return {
        ...state,
        isAuthorized: true,
      };
    case TYPES.auth.LOGOUT:
      // authTokens.remove();
      return {
        ...state,
        isAuthorized: false,
      };
    default:
      return { ...state };
  }
};
