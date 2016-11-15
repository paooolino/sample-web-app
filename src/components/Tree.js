/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {VelocityComponent} from 'velocity-react';

/*
	internal imports
*/

import TreeItem from './TreeItem';

/*
	stateless component
*/

const Component = (props) => (
<div>
  <div>Tree</div>
  <TreeItem level="1" data={props.data[0]} />
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
