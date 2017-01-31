import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingVacancies(state = false, action){
	const { type } = action;
	
	if (type === constants.VACANCIES_GET_VACANCY){
		return true;
	}
	return state;
}

export default function vacancy(state = {
	id: null,
	title: '',
	status: '',
	date: '',
	comments: [],
	candidates: [],
	isFetching: false
}, action) {
	switch (action.type) {
		case constants.VACANCIES_GET_VACANCY:
		case constants.VACANCIES_GET_VACANCY_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingVacancies(state.isFetching, action) });

		default:
			return state;
	}
}

