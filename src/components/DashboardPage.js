/*
	external imports
*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

/*
	internal imports
*/

import * as actions_tree from '../redux/tree';
import Tree from './Tree';

/*
	stateless component
*/

const Component = (props) => (
	<div>
		<h1>Dashboard</h1>
		<Tree data={props.urlTreeData} />
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
	urlTreeData: PropTypes.array.isRequired
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
	urlTreeData: state.tree.urlTreeData	
});

/*
	connect & export
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Component);
