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
		urlTreeData: [ { id: 1, title: 'Home', slug: '', children: [{ id: 2, title: 'Info', slug: 'info' }, { id: 3, title: 'Products', slug: 'products' }, { id: 4, title: 'News', slug: 'news' }, { id: 5, title: 'Contacts', slug: 'contacts' }] } ]
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


