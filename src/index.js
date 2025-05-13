import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux"; //Provides the state to the app
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";



import App from "./App";



ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
