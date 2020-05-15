import { createStore } from "redux";
export { useSelector, useDispatch } from "react-redux";

const INITIAL_STATE = {
  authorized:
    localStorage.getItem("accessToken") && localStorage.getItem("refreshToken"),
  user: {},
  typingUsers: {},
  menuIsOpen: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        authorized: true,
        user: payload,
      };
    case "SET_TYPING":
      return { ...state, typingUsers: { ...state.typingUsers, ...payload } };
    case "TOGGLE_MENU":
      return { ...state, menuIsOpen: !state.menuIsOpen };
    default:
      return state;
  }
};

export const dispatchSetUser = (payload) => ({ type: "SET_USER", payload });

export const dispatchSetTyping = (payload) => ({ type: "SET_TYPING", payload });

export const dispatchToggleMenu = () => ({ type: "TOGGLE_MENU" });

export const store = createStore(reducer, INITIAL_STATE);
