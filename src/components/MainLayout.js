/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';

/*
	internal imports
*/

import Nav from './Nav';

/*
	stateless component
*/

const Component = (props) => (
<div className="MainLayout style-normal">
  <Nav />
  {props.children}
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

export default Component;
