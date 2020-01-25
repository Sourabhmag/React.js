import { createStore, applyMiddleware } from "redux";
import Reducer from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  Reducer,composeWithDevTools(applyMiddleware()
));
export default store;
