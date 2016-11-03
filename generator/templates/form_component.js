/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

/*
	internal imports
*/

/*
	stateless component
*/

const Component = (props) => (
##COMPONENT_HTML##
);

/*
	decorate & export
*/

export default reduxForm({
  form: 'login' // a unique name for this form
})(Component);
