/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

/*
	internal imports
*/

import renderField from '../utils/renderField';

/*
	stateless component
*/

const Component = (props) => (
<div>
  <form onSubmit={props.handleSubmit}>
    <button>Login</button>
  </form>
</div>

);

/*
	validation function
*/

const validate = values => {
	const errors = {};
	
	
	
	return errors;
}

/*
	decorate & export
*/

export default reduxForm({
  form: 'login', 	// a unique name for this form
	validate				// <--- validation function given to redux-form
})(Component);
