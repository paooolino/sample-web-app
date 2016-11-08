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

const SUBMIT_REQUEST = 'login/SUBMIT_REQUEST';
const SUBMIT_FAILURE = 'login/SUBMIT_FAILURE';
const SUBMIT_SUCCESS = 'login/SUBMIT_SUCCESS';
const CLEAN_ERROR_MESSAGE = 'login/CLEAN_ERROR_MESSAGE';

/*
	reducer
*/

const initialState = {
	isSubmitting: false,
	errorMessage: '',
	loginResult: '',
	isLoggedIn: false
};

export default (state=initialState, action) => {
	switch(action.type) {
		case SUBMIT_REQUEST:
			return Object.assign({}, state, {
				isSubmitting: true
			})

		case SUBMIT_FAILURE:
			return Object.assign({}, state, {
				errorMessage: action.err,
				isSubmitting: false
			})

		case SUBMIT_SUCCESS:
			return Object.assign({}, state, {
				loginResult: action.json,
				isSubmitting: false,
				errorMessage: '',
				isLoggedIn: true
			})

		case CLEAN_ERROR_MESSAGE:
			return Object.assign({}, state, {
				errorMessage: ''
			})

		default:
			return state;
	}
};

/*
	async action creators
*/


export const submit = (usr, pwd) => {
  // we return a thunk function, not an action object!
  // the thunk function needs to dispatch some actions to change the 
  // Store status, so it receives the "dispatch" function as its first parameter
  return (dispatch) => {
    // here starts the code that actually gets executed when the addTodo action 
    // creator is dispatched

    // first of all, let's do the optimistic UI update - we need to 
    // dispatch the old synchronous action object, using the renamed 
    // action creator
    dispatch(submit_request());

    // now that the Store has been notified of the new todo item, we 
    // should also notify our server - we'll use here ES6 fetch function 
    // to post the data
    fetch(ENDPOINT_HOST + ENDPOINT_PATH, {
      method: 'post',
      body: JSON.stringify({
        usr, pwd
      })
    }).then(response => {
      // you should probably get a real id for your new todo item here, 
      // and update your store, but we'll leave that to you
			if(!response.ok) {
				dispatch(submit_failure(response.status + ' - ' + response.statusText));
			} else {
				dispatch(submit_success(response.json()));
				dispatch(push('/dashboard'));

			}
    }).catch(err => {
			// Error: handle it the way you like, undoing the optimistic update,
			//  showing a "out of sync" message, etc.
			dispatch(submit_failure(err.message));
    });
		
		// what you return here gets returned by the dispatch function that used   
		// this action creator
		return null; 
  }
}


/*
	sync action creators
*/

export const submit_request = () => ({
	type: SUBMIT_REQUEST
})


export const submit_failure = (err) => ({
	type: SUBMIT_FAILURE,
	err
})


export const submit_success = (json) => ({
	type: SUBMIT_SUCCESS,
	json
})


export const clean_error_message = () => ({
	type: CLEAN_ERROR_MESSAGE
})

