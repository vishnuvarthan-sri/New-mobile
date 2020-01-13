import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { HashRouter, Route } from "react-router-dom";
import Throttle from "lodash/throttle";
import { saveState, loadState } from "./util";

// require('./styles/main.css')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  // persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const App = () =>
  <div style={{ height: "100%" }}>
    <Route path="/" exact component={Home} />
    <Route exact path="/home" component={Home} />
    <Route path="/login" component={Login} />
  </div>;
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("app")
);
