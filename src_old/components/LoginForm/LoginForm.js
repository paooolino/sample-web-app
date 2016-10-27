/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/*
	internal imports
*/

import * as actions from '../../redux/login';
import FormRow from '../FormRow/FormRow';

/*
	stateless component
*/

const LoginForm = (props) => (
	<div>
		<form onSubmit={props.submit_handler}>
			<FormRow name="usr" label="username" change_handler={props.change_handler} value={props.usr} />
			<FormRow name="pwd" type="password" label="password" change_handler={props.change_handler} value={props.pwd} />
			<div>
				<span>{props.error_message}</span>
			</div>
			<div>
				{props.isRequesting ? <span>requesting...</span> : <button>Log in</button>}
			</div>
		</form>
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
