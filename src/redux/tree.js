/*
	external imports
*/

import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

/*
	internal imports
*/

import { ENDPOINT_HOST, ENDPOINT_PATH } from '../../config';

/*
	action constants
*/



/*
	reducer
*/

const initialState = {
		urlTreeData: [{title: 'main', subtitle: 'sub'}, { title: 'value2', expanded: true, children: [{ title: 'value3' }] }]
};

export default (state=initialState, action) => {
	switch(action.type) {

		default:
			return state;
	}
};

/*
	async action creators
*/



/*
	sync action creators
*/


