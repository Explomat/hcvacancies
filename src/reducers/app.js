import constants from '../constants';
import { setSuccess, setFailure } from './utils/setState';
import assign from 'lodash/assign';

function isError(state = null, action) {
	const { error } = action;
	if (error) {
		return action.error;
	}
	return null;
}

export default function myapp(state = {
	title: 'Вакансии',
	access: false,
	isFetching: false,
	errorMessage: null
}, action) {
	switch (action.type) {
		case constants.APP_GET_ACCESS:
			return assign({}, state, { isFetching: true });
		case constants.APP_GET_ACCESS_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.APP_GET_ACCESS_SUCCESS:
			return setSuccess(state, action.response, 'error', 'isFetching');
			
		case constants.APP_ERROR_MESSAGE:
			return assign({}, state, { isFetching: false, errorMessage: isError(state.errorMessage, action) });
		case constants.APP_CHANGE_TITLE:
			return assign({}, state, { title: action.title });
		default:
			return state;
	}
}

