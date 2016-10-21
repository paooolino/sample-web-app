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

import MainLayout from './components/MainLayout';
import PHome from './components/PHome';
import PLogin from './components/PLogin';
import PRegister from './components/PRegister';
import PLostPassword from './components/PLostPassword';

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
				<Route path="/login" component={PLogin} />
				<Route path="/register" component={PRegister} />
				<Route path="/lost-password" component={PLostPassword} />
      </Route>
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
