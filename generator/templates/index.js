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

##LAYOUT_IMPORTS##
##REDUX_IMPORTS##

/*
	store creation
*/

let store = createStore(combineReducers({
	##REDUCERS_LIST##
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
##ROUTES_TREE##
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
