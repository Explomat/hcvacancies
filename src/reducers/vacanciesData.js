import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingVacancies(state = false, action){
	const { type } = action;
	
	if (type === constants.VACANCIES_GET_VACANCIES){
		return true;
	}
	return state;
}

function receiveVacancies(state = [], action){
	const { type } = action;
	if (type === constants.VACANCIES_GET_VACANCIES_SUCCESS){
		return assign([], state, action.response);
	}
	return state;
}

export default function vacanciesData(state = {
	vacancies: [],
	isFetching: false,
	search: '',
	page: 1,
	statusFilter: {
		filters: [
			{ payload: 'all', text: 'Все вакансии' },
			{ payload: 'opened', text: 'Открытые' },
			{ payload: 'closed', text: 'Закрытые' },
			{ payload: 'active', text: 'В работе' }
		],
		selected: 'all'
	},
	orderedByTitle: true,
	orderedByStatus: false
					
}, action) {
	switch (action.type) {
		case constants.VACANCIES_GET_VACANCIES:
		case constants.VACANCIES_GET_VACANCIES_SUCCESS: {
			return assign({}, state, {
				vacancies: receiveVacancies(state.vacancies, action),
				isFetching: isFetchingVacancies(state.isFetching, action)
			});
		}

		default:
			return state;
	}
}

