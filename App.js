import React from "react";
import MainNavigator from "./helpers/Navigation";
import ReduxThunk from "redux-thunk";

import eTeamReducers from "./helpers/eTeam-reducers";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  eTeam: eTeamReducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
