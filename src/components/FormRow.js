/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/*
	internal imports
*/




/*
	stateless component
*/

const LoginForm = (props) => (
<div className="formRow">
	<div className="formLabel">
		{props.label}
	</div>
	<div className="formField">
		{(()=>{
			switch(props.type) {
				case "password":
					return <input type="password" name={props.name} onChange={props.change_handler} value={props.value} />
				default:
					return <input name={props.name} onChange={props.change_handler} value={props.value} />
			}
		})()}
	</div>
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

}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
	
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
)(LoginForm);
