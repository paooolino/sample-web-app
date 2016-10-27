/*
	external imports
*/

import fetch from 'isomorphic-fetch'

/*
	internal imports
*/

import { ENDPOINT_HOST, ENDPOINT_PATH } from '../config';

/*
	action constants
*/

##ACTION_CONSTANTS##

/*
	reducer
*/

const initialState = {
##INITIAL_STATE##
};

export default (state=initialState, action) => {
	switch(action.type) {
##REDUCER_ACTIONS##
		default:
			return state;
	}
};

/*
	async action creators
*/

##ASYNC_ACTIONS##

/*
	sync action creators
*/

##SYNC_ACTIONS##
