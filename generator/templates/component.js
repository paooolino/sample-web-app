/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/*
	internal imports
*/

##REDUX_ACTIONS##
##HELPER_COMPONENTS##

/*
	stateless component
*/

const LoginForm = (props) => (
##COMPONENT_HTML##
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

LoginForm.propTypes = {
	// state
	usr: PropTypes.string.isRequired,
	pwd: PropTypes.string.isRequired,
	isRequesting: PropTypes.bool.isRequired,
	error_message: PropTypes.string.isRequired,
	
	// handlers
	submit_handler: PropTypes.func.isRequired,
	change_handler: PropTypes.func.isRequired
}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
	submit_handler: (evt) => {
		evt.preventDefault();
		dispatch(actions.submit());
	},
	change_handler: (evt) => {
		dispatch(actions.change(evt.target.name, evt.target.value));
	}
});

/*
	state
*/

const mapStateToProps = (state) => ({
	usr: state.login.usr,
	pwd: state.login.pwd,
	isRequesting: state.login.isRequesting,
	error_message: state.login.error_message,
	getFieldValue: (obj) => {
		return obj.value;
	}
});

/*
	connect & export
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
