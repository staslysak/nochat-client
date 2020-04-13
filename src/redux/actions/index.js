import { createActions, handleActions } from "redux-actions";
import { authTokens } from "utils/index";

export const { dispatchLogin } = createActions({
  DISPATCH_LOGIN: ({ token, refreshToken }) => ({ token, refreshToken }),
});

export const { dispatchLogout } = createActions({
  DISPATCH_LOGOUT: (isAuthorized = false) => ({ isAuthorized }),
});

const defaultState = { isAuthorized: false };

const authReducer = handleActions(
  {
    [dispatchLogin]: (state, { payload }) => {
      authTokens.set(payload);
      return { ...state, isAuthorized: true };
    },
    [dispatchLogout]: (state, { payload: { isAuthorized } }) => {
      authTokens.remove();
      return { ...state, isAuthorized };
    },
  },
  defaultState
);

export default authReducer;
