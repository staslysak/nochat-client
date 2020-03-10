import TYPES from "redux/actions/types";

export const dispatchLogin = payload => ({ type: TYPES.auth.LOGIN, payload });

export const dispatchLogout = () => ({ type: TYPES.auth.LOGOUT });

export const dispatchUser = payload => ({ type: TYPES.auth.USER, payload });

export const dispatchActiveChat = payload => ({ type: TYPES.auth.ACTIVE_CHAT, payload });

export const dispatchDirects = payload => ({ type: TYPES.auth.DIRECTS, payload });
