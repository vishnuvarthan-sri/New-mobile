import 'semantic-ui-css/semantic.min.css'
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import reducers from "./reducers/index"
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { HashRouter, Route } from "react-router-dom";
import Throttle from "lodash/throttle";
import {loadState,saveState} from "./util"
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
require('./styles/main.css')

// const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(reduxThunk)
));

const App = () =>
  <div style={{ height: "100%" }}>
    <Route path="/" exact component={Home} />
    <Route exact path="/home" component={Home} />
    <Route path="/login" component={Login} />
  </div>;

ReactDOM.render(
  <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
      </Provider>, 
  
  document.getElementById("app")
);
