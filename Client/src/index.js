import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux"; //Provides the state to the app
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers"; //importing the reducers

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk))); //creating the store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
