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
<div className="Popup">
  <div className="Popup_inner">
    <div className="Popup_message">{props.message}</div>
    <button onClick={props.close_handler}>OK</button>
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
	message: PropTypes.string.isRequired,
	close_handler: PropTypes.func.isRequired
}

export default Component;
