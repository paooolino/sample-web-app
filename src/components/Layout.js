/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {VelocityComponent} from 'velocity-react';

/*
	internal imports
*/



/*
	stateless component
*/

const Component = (props) => (
<div>
  <header>
    <div>
      <div>
        <b>Login/Register</b> -
        <Link to="/">HomePage</Link> |
        <Link to="/login">LoginPage</Link> |
        <Link to="/register">RegisterPage</Link> |
        <Link to="/lost-password">LostPasswordPage</Link> |
        <Link to="/dashboard">DashboardPage</Link>
      </div>
      <div>
        <b>Public</b> -
        <Link to="/teams">PublicTeamsPage</Link> |
        <Link to="/team/0">PublicTeamPage</Link> |
        <Link to="/player/0">PublicPlayerPage</Link> |
        <Link to="/current-season">SeasonPage</Link>
      </div>
      <div>
        <b>Management</b> -
        <Link to="/dashboard/team">TeamPage</Link> |
        <Link to="/dashboard/player/0">PlayerPage</Link> |
        <Link to="/dashboard/training">TrainingPage</Link> |
        <Link to="/dashboard/lineup">LineupPage</Link> |
        <Link to="/dashboard/livematch">LiveMatchPage</Link> |
        <Link to="/dashboard/stadium">StadiumPage</Link> |
        <Link to="/dashboard/finance">FinancePage</Link> |
        <Link to="/dashboard/events">EventsPage</Link> |
        <Link to="/dashboard/fixtures">FixturesPage</Link> |
        <Link to="/dashboard/standings">StandingsPage</Link>
      </div>
    </div>
  </header>
  <div className="content">
    {props.children}
  </div>
  <footer>
    <div>
      Copyright (c) 2016
    </div>
  </footer>
</div>

);

/*
	PropTypes
	
	These are the required properties for the stateless component
	defined above. Accepted values are:
	- string
	- func
	- bool
	...
*/

Component.propTypes = {

}

export default Component;
