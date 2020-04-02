import TYPES from "redux/actions/types";

export const dispatchLogin = payload => ({ type: TYPES.auth.LOGIN, payload });

export const dispatchLogout = () => ({ type: TYPES.auth.LOGOUT });

export const dispatchTypeMessage = payload => ({
  type: TYPES.auth.TYPE_MESSAGE,
  payload
});

export const dispatchChatId = payload => ({
  type: TYPES.auth.CHAT_ID,
  payload
});
