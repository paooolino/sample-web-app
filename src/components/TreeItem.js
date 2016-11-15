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
  <div className={"treeitem level_" + props.level}>
    {props.data.title}
    {props.data.children && props.data.children.map((d) => <TreeItem level={parseInt(props.level) + 1} key={d.id} data={d} />)}
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

Component.propTypes = {

}

export default Component;
