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

const LOGIN = 'login/LOGIN';

/*
	reducer
*/

const initialState = {
		isLoggedIn: false
};

export default (state=initialState, action) => {
	switch(action.type) {
		case LOGIN:
			return Object.assign({}, state, {
				isLoggedIn: true
			})

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

export const login = () => ({
	type: LOGIN
})

