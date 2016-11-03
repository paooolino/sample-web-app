/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';

/*
	internal imports
*/

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

export default Component;
