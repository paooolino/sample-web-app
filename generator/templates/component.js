/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {VelocityComponent} from 'velocity-react';

/*
	internal imports
*/

##REDUX_ACTIONS##
##HELPER_COMPONENTS##

/*
	stateless component
*/

const Component = (props) => (
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

Component.propTypes = {
##PROPTYPES##
}

/*
	dispatches
*/

const mapDispatchToProps = (dispatch) => ({
##DISPATCH_TO_PROPS##	
});

/*
	state
*/

const mapStateToProps = (state) => ({
##STATE_TO_PROPS##	
});

/*
	connect & export
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Component);
