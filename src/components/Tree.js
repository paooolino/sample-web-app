/*
	external imports
*/

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {VelocityComponent} from 'velocity-react';

/*
	internal imports
*/



/*
	stateless component
*/

const Component = (props) => (
<div>
  <div>Tree</div>
  <div>{(() => {
    console.log(props.data);
    return <div>ohoh</div>
  })()}</div>
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