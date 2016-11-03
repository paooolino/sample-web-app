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

/*
	stateless component
*/

const Component = (props) => (
<div className="LoginPage">
  {props.isSubmitting ?
    <span>Requesting...</span>
  :
    <form onSubmit={props.submit_handler}>
      <div className="formRow">
        <div className="formLabel">
          Username
        </div>
        <div className="formField">
          <input name="usr" onChange={props.change_handler} value={props.usr} />
        </div>
      </div>
      <div className="formRow">
        <div className="formLabel">
          Password
        </div>
        <div className="formField">
          <input type="password" onChange={props.change_handler} name="pwd" value={props.pwd} />
        </div>
      </div>
      <div className="formRow">
        <button>Login</button>
      </div>
    </form>
  }
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
	usr: PropTypes.string.isRequired,
	pwd: PropTypes.string.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string.isRequired,
	change_handler: PropTypes.func.isRequired,
	submit_handler: PropTypes.func.isRequired,
	clean_error_message_handler: PropTypes.func.isRequired
}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
	change_handler: (evt) => {
  dispatch(actions_login.change(evt.target.name, evt.target.value));
}
,
	submit_handler: (evt) => {
  evt.preventDefault();
  dispatch(actions_login.submit(evt.target.usr.value, evt.target.pwd.value));
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
	usr: state.login.usr,
	pwd: state.login.pwd,
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
