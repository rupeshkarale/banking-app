import { legacy_createStore, applyMiddleware, compose, combineReducers } from "redux";
import { reducer as AuthReducer } from "./AuthReducer/reducer"
import { reducer as ProfileReducer } from "./ProfileReducer/reducer"

import thunk from "redux-thunk"

const rootReducer = combineReducers({ AuthReducer, ProfileReducer })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;



