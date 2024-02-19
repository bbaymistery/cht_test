import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { pickUpDropOffActions } from "./pickUpDropOffActions";


const reducer = combineReducers({ pickUpDropOffActions });
const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;
