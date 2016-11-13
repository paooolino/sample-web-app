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
<form onSubmit={props.handleSubmit}>
  <div className="formRow">
    <div className="formLabel">
      Username
    </div>
    <div className="formField">
      <Field name="usr" component={renderField} type="text" />
    </div>
  </div>
  <div className="formRow">
    <div className="formLabel">
      Password
    </div>
    <div className="formField">
      <Field name="pwd" component={renderField} type="password" />
    </div>
  </div>
  <div className="formRow">
    {props.submitting ?
      <span>submitting...</span>
    :
      <button type="submit">Login</button>
    }
  </div>
</form>

);

/*
	validation function
*/

const validate = values => {
	const errors = {};
	
	if (!values.usr) {
		errors.usr = 'Compilare questo campo.';
	}
	if (!values.pwd) {
		errors.pwd = 'Compilare questo campo.';
	}
	
	return errors;
}

/*
	decorate & export
*/

export default reduxForm({
  form: 'login', 	// a unique name for this form
	validate				// <--- validation function given to redux-form
})(Component);
