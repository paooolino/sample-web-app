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

import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import TimeSelector from './components/TimeSelector';
import bookingReducer from './redux/booking';

/*
	store creation
*/

let store = createStore(combineReducers({
	booking: bookingReducer,
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
				<IndexRoute component={HomePage} />
				<Route path="/prenota" component={TimeSelector} />
			</Route>
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
