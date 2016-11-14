/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

/*
	internal imports
*/

import * as actions_login from '../redux/login';
import LoginForm from './LoginForm';

/*
	stateless component
*/

const Component = (props) => (
	<div>
		<h1>Login</h1>
		<LoginForm onSubmit={props.handleSubmit} />
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
	handleSubmit: PropTypes.func.isRequired
}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
	handleSubmit: (evt) => {
		dispatch(actions_login.login());
		dispatch(push('/dashboard'));
	}	
});

/*
	state
*/

const mapStateToProps = (state) => ({
		
});

/*
	connect & export
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Component);
