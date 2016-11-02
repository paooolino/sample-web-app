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
<div>
  <div className="desc">Quando vuoi giocare?</div>
  <Link onClick={props.select_time} data-time="Mattina" className="button" to="step-field">Mattina<span>dalle 7:00 alle 12:00</span></Link>
  <Link onClick={props.select_time} data-time="Pomeriggio" className="button" to="step-field">Pomeriggio<span>dalle 12:00 alle 18:00</span></Link>
  <Link onClick={props.select_time} data-time="Sera" className="button" to="step-field">Sera<span>dalle 18:00 alle 22:00</span></Link>
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
