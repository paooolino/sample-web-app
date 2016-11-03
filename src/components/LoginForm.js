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
<form onSubmit={props.handleSubmit}>
  <div className="formRow">
    <div className="formLabel">
      Username
    </div>
    <div className="formField">
      <Field name="usr" component="input" type="text" />
    </div>
  </div>
  <div className="formRow">
    <div className="formLabel">
      Password
    </div>
    <div className="formField">
      <Field name="pwd" component="input" type="password" />
    </div>
  </div>
  <div className="formRow">
    <button disabled={props.pristine || props.submitting}>Login</button>
  </div>
</form>

);

/*
	decorate & export
*/

export default reduxForm({
  form: 'login' // a unique name for this form
})(Component);
