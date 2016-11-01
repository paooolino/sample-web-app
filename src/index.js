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
import PStart from './layout_components/PStart';
import PTime from './layout_components/PTime';
import PField from './layout_components/PField';
import PConfirm from './layout_components/PConfirm';
import PDataTel from './layout_components/PDataTel';
import PDataMail from './layout_components/PDataMail';
import PFinish from './layout_components/PFinish';
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
				<IndexRoute component={PStart} />
				<Route path="/step-time" component={PTime} />
				<Route path="/step-field" component={PField} />
				<Route path="/step-confirm" component={PConfirm} />
				<Route path="/step-data-tel" component={PDataTel} />
				<Route path="/step-data-mail" component={PDataMail} />
				<Route path="/step-finish" component={PFinish} />
			</Route>

    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
