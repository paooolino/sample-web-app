/*
	external imports
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/*
	internal imports
*/

import MainLayout from './components/MainLayout.js';
import PHome from './components/PHome.js';

/*
	store creation
*/

let store = createStore(combineReducers({
  routing: routerReducer
}))

/*
	history <> store sync
*/

let history = syncHistoryWithStore(browserHistory, store);

/*
	App render
*/

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
				<IndexRoute component={PHome} />
      </Route>
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
