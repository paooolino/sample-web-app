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
export const submit = (usr, pwd) => (dispatch) => {
	dispatch(request());
	return fetch(ENDPOINT_HOST + ENDPOINT_PATH, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			usr,
			pwd
		})
	})
		.then(response => {
			if(!response.ok) {
				dispatch(request_failure(response.status + ' - ' + response.statusText))
			} else {
				// request_success
				
			}
		})
		.catch(err => {
			dispatch(request_failure(err.message))
		});
};

/*
	sync action creators
*/

export const change = (name, value) => ({
	type: CHANGE,
	name,
	value
});

export const request = () => ({
	type: REQUEST
});

const request_failure = (error_message) => ({
	type: REQUEST_FAILURE,
	error_message
});
