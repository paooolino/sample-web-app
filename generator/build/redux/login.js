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

const REQUEST = 'login/REQUEST';
const REQUEST_FAILURE = 'login/REQUEST_FAILURE';
const REQUEST_SUCCESS = 'login/REQUEST_SUCCESS';

/*
	reducer
*/

const initialState = {
	usr: '',
	pwd: '',
	isRequesting: false,
	error_message: ''
};

export default (state=initialState, action) => {
	switch(action.type) {
		case REQUEST
			return Object.assign({}, state, {
				isRequesting: true
			})

		case REQUEST_FAILURE
			return Object.assign({}, state, {
				isRequesting: false,
				error_message: action.error_message
			})

		case REQUEST_SUCCESS
			return Object.assign({}, state, {

			})

		default:
			return state;
	}
};

/*
	async action creators
*/

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
}

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
