
export const ##ACTION_NAME## = (##ASYNC_INPUTS##) => {
  // we return a thunk function, not an action object!
  // the thunk function needs to dispatch some actions to change the 
  // Store status, so it receives the "dispatch" function as its first parameter
  return (dispatch) => {
    // here starts the code that actually gets executed when the addTodo action 
    // creator is dispatched

    // first of all, let's do the optimistic UI update - we need to 
    // dispatch the old synchronous action object, using the renamed 
    // action creator
    dispatch(##REQUEST_ACTION_NAME##());

    // now that the Store has been notified of the new todo item, we 
    // should also notify our server - we'll use here ES6 fetch function 
    // to post the data
		const body_request = {##ASYNC_INPUTS##};
		body_request.action = ##REQUEST_ACTION_NAME_UPPERCASE##;
    return fetch(ENDPOINT_HOST + ENDPOINT_PATH, {
				method: 'post',
				body: JSON.stringify(body_request)
			})
			.then(response => response.json())
			.then(json => {
				dispatch(##SUCCESS_ACTION_NAME##(json));
				##ON_SUCCESS##
			})
			.catch(err => {
				// Error: handle it the way you like, undoing the optimistic update,
				//  showing a "out of sync" message, etc.
				dispatch(##FAILURE_ACTION_NAME##(err.message));
			});
			
		/*	
    return fetch(ENDPOINT_HOST + ENDPOINT_PATH, {
      method: 'post',
      body: JSON.stringify(body_request)
    }).then(response => {
      // you should probably get a real id for your new todo item here, 
      // and update your store, but we'll leave that to you
			if(!response.ok) {
				dispatch(##FAILURE_ACTION_NAME##(response.status + ' - ' + response.statusText));
			} else {
				dispatch(##SUCCESS_ACTION_NAME##(response.json()));
				##ON_SUCCESS##
			}
    }).catch(err => {
			// Error: handle it the way you like, undoing the optimistic update,
			//  showing a "out of sync" message, etc.
			dispatch(##FAILURE_ACTION_NAME##(err.message));
    });
		*/
  }
}
