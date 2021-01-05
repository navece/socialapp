import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
