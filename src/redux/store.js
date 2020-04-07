import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "redux/reducers";

const INITIAL_STATE = {};
const MIDDLEWARE = [];

export const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...MIDDLEWARE))
);
