/*
	external imports
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/*
	internal imports
*/

import MainLayout from './layout_components/MainLayout';
import Header from './layout_components/Header';
import Footer from './layout_components/Footer';
import Nav from './layout_components/Nav';
import PHome from './layout_components/PHome';
import PLogin from './layout_components/PLogin';
import loginReducer from './redux/login';

/*
	store creation
*/

let store = createStore(combineReducers({
	import loginReducer from './redux/login';
  routing: routerReducer
}), applyMiddleware(thunk))

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
