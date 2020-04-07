import TYPES from "redux/actions/types";

export const dispatchLogin = (payload) => ({ type: TYPES.auth.LOGIN, payload });

export const dispatchLogout = () => ({ type: TYPES.auth.LOGOUT });

export const authTokens = {
  set: ({ token, refreshToken }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  },
  remove: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
};
