/*
	external imports
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

/*
	internal imports
*/

##REDUX_ACTIONS##
##HELPER_COMPONENTS##

/*
	stateless component
*/

##COMPONENT_HELPERFUNCTIONS##

class MyComponent extends Component {
	constructor(props) {
		super(props);
	}
	
	##COMPONENT_WILL_MOUNT##
	
	##COMPONENT_WILL_RECEIVE_PROPS##
	
	render() {
		return (
			##COMPONENT_HTML##
		);
	}
}

/*
	PropTypes
	
	These are the required properties for the stateless component
	defined above. Accepted values are:
	- string
	- func
	- bool
	...
*/

MyComponent.propTypes = {
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
)(MyComponent);
