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

const SELECT_TIME = 'booking/SELECT_TIME';
const SELECT_FIELD = 'booking/SELECT_FIELD';
const SET_BOOKING_NAME = 'booking/SET_BOOKING_NAME';
const SET_BOOKING_TEL = 'booking/SET_BOOKING_TEL';
const SET_BOOKING_MAIL = 'booking/SET_BOOKING_MAIL';

/*
	reducer
*/

const initialState = {
	timeSelected: '',
	fieldSelected: 0,
	bookingName: '',
	bookingTel: '',
	bookingMail: ''
};

export default (state=initialState, action) => {
	switch(action.type) {
		case SELECT_TIME:
			return Object.assign({}, state, {
				timeSelected: dayTime
			})

		case SELECT_FIELD:
			return Object.assign({}, state, {
				fieldSelected: field_id
			})

		case SET_BOOKING_NAME:
			return Object.assign({}, state, {
				bookingName: booking_name
			})

		case SET_BOOKING_TEL:
			return Object.assign({}, state, {
				bookingTel: booking_tel
			})

		case SET_BOOKING_MAIL:
			return Object.assign({}, state, {
				bookingMail: booking_mail
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

export const select_time = (dayTime) => ({
	type: SELECT_TIME,
	dayTime
})


export const select_field = (field_id) => ({
	type: SELECT_FIELD,
	field_id
})


export const set_booking_name = (booking_name) => ({
	type: SET_BOOKING_NAME,
	booking_name
})


export const set_booking_tel = (booking_tel) => ({
	type: SET_BOOKING_TEL,
	booking_tel
})


export const set_booking_mail = (booking_mail) => ({
	type: SET_BOOKING_MAIL,
	booking_mail
})

