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
##COMPONENT_HTML##
);

/*
	validation function
*/

const validate = values => {
	const errors = {};
	
	##VALIDATORS##
	
	return errors;
}

/*
	decorate & export
*/

export default reduxForm({
  form: 'login', 	// a unique name for this form
	validate				// <--- validation function given to redux-form
})(Component);
