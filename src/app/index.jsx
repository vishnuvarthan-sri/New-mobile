
import 'react-table-6/react-table.css'

import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import ControlPanel from './components/ControlPanel.jsx';
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { HashRouter, Route } from "react-router-dom";
import Throttle from "lodash/throttle";

import { saveState, loadState } from "./util";

// require('./styles/main.css')
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);
store.subscribe(Throttle(() => {
  saveState({
    auth: store.getState().auth,
    home: store.getState().home
  });
}, 1000));

const App = () =>
  <div style={{ height: "100%" }}>
    <Route path="/" exact component={Home} />
    <Route exact path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/controlpanel" component={ControlPanel} />
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
