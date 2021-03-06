import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingVacancies(state = false, action){
	const { type } = action;
	
	if (type === constants.VACANCIES_GET_VACANCY){
		return true;
	}
	return false;
}

export default function vacancy(state = {
	id: null,
	name: '',
	state_id: '',
	vacancyStates: [],
	candidateStates: [],
	start_date: '',
	candidates: [],
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.VACANCIES_GET_VACANCY:
		case constants.VACANCIES_GET_VACANCY_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingVacancies(state.isFetching, action) });

		default:
			return state;
	}
}

