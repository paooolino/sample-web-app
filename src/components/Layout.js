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
  <header>
    CMS App.
  </header>
  <div className="content">
    {props.children}
  </div>
  <footer>
    <div>
      Copyright (c) 2016
    </div>
  </footer>
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
