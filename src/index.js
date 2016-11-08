/*
	external imports
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	internal imports
*/

import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import loginReducer from './redux/login';

/*
	store creation
*/

let store = createStore(combineReducers({
	login: loginReducer,
  routing: routerReducer,
	form: formReducer
}), applyMiddleware(thunk, routerMiddleware(browserHistory)));

store.subscribe(() =>	console.log(store.getState()));

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
				<IndexRoute component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/dashboard" component={DashboardPage} />
			</Route>
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
