/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

/*
	internal imports
*/




/*
	stateless component
*/

const Component = (props) => (
<div className="Nav">
  <Link to="/">Home</Link>
  <Link to="/login">Login</Link>
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
)(Component);
