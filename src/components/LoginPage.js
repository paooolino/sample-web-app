/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

/*
	internal imports
*/

import * as actions_login from '../redux/login';
import Popup from './Popup';
import LoginForm from './LoginForm';

/*
	stateless component
*/

const Component = (props) => (
<div className="LoginPage">
  <LoginForm onSubmit={props.handleSubmit} />
  {props.errorMessage!='' && <Popup close_handler={props.clean_error_message_handler} message={props.errorMessage} />}
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
	isSubmitting: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	clean_error_message_handler: PropTypes.func.isRequired
}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
	handleSubmit: (data) => {
  dispatch(actions_login.submit(data.usr, data.pwd));
}
,
	clean_error_message_handler: (evt) => {
  dispatch(actions_login.clean_error_message());
}
	
});

/*
	state
*/

const mapStateToProps = (state) => ({
	isSubmitting: state.login.isSubmitting,
	errorMessage: state.login.errorMessage	
});

/*
	connect & export
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Component);
