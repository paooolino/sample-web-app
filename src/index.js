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

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LostPasswordPage from './components/LostPasswordPage';
import DashboardPage from './components/DashboardPage';
import PublicTeamsPage from './components/PublicTeamsPage';
import PublicTeamPage from './components/PublicTeamPage';
import PublicPlayerPage from './components/PublicPlayerPage';
import SeasonPage from './components/SeasonPage';
import TeamPage from './components/TeamPage';
import PlayerPage from './components/PlayerPage';
import TrainingPage from './components/TrainingPage';
import LineupPage from './components/LineupPage';
import LiveMatchPage from './components/LiveMatchPage';
import StadiumPage from './components/StadiumPage';
import FinancePage from './components/FinancePage';
import EventsPage from './components/EventsPage';
import FixturesPage from './components/FixturesPage';
import StandingsPage from './components/StandingsPage';


/*
	store creation
*/

let store = createStore(combineReducers({
	
  routing: routerReducer,
	form: formReducer
}), applyMiddleware(thunk, routerMiddleware(browserHistory)));

//store.subscribe(() =>	console.log(store.getState()));

/*
	history <> store sync
*/

let history = syncHistoryWithStore(browserHistory, store);

/*
	App render
*/

const checkLogin = (nextState, replace) => {
// do nothing
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
			<Route path="/" component={Layout} >
				<IndexRoute component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/lost-password" component={LostPasswordPage} />
				<Route path="/dashboard" component={DashboardPage} onEnter={checkLogin} />
				<Route path="/teams" component={PublicTeamsPage} />
				<Route path="/team/:id" component={PublicTeamPage} />
				<Route path="/player/:id" component={PublicPlayerPage} />
				<Route path="/current-season" component={SeasonPage} />
				<Route path="/dashboard/team" component={TeamPage} onEnter={checkLogin} />
				<Route path="/dashboard/player/:id" component={PlayerPage} onEnter={checkLogin} />
				<Route path="/dashboard/training" component={TrainingPage} onEnter={checkLogin} />
				<Route path="/dashboard/lineup" component={LineupPage} onEnter={checkLogin} />
				<Route path="/dashboard/livematch" component={LiveMatchPage} onEnter={checkLogin} />
				<Route path="/dashboard/stadium" component={StadiumPage} onEnter={checkLogin} />
				<Route path="/dashboard/finance" component={FinancePage} onEnter={checkLogin} />
				<Route path="/dashboard/events" component={EventsPage} onEnter={checkLogin} />
				<Route path="/dashboard/fixtures" component={FixturesPage} onEnter={checkLogin} />
				<Route path="/dashboard/standings" component={StandingsPage} onEnter={checkLogin} />
			</Route>
    </Router>
  </Provider>,
  document.querySelectorAll('#rootElement')[0]
);
