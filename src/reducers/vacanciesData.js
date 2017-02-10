import constants from '../constants';
import assign from 'lodash/assign';
import concat from 'lodash/concat';

const defaultStates = [ { payload: 'all', text: 'Все вакансии' } ];

function isFetchingVacancies(state = false, action){
	const { type } = action;
	
	if (type === constants.VACANCIES_GET_VACANCIES){
		return true;
	}
	return false;
}

function receiveVacancies(state = [], action){
	const { type } = action;
	if (type === constants.VACANCIES_GET_VACANCIES_SUCCESS){
		return assign([], action.vacancies);
	}
	return state;
}

function isFetchingVacanciesScroll(state = false, action){
	const { type } = action;
	
	if (type === constants.VACANCIES_GET_VACANCIES_ON_SCROLL){
		return true;
	}
	return false;
}

function receiveVacanciesOnScroll(state = [], action){
	const { type } = action;
	if (type === constants.VACANCIES_GET_VACANCIES_ON_SCROLL_SUCCESS){
		return state.concat(action.vacancies);
	}
	return state;
}

export default function vacanciesData(state = {
	vacancies: [],
	isFetching: false,
	isFetchingScroll: false,
	search: '',
	page: 0,
	pages_count: 1,
	count: 0,
	statusFilter: {
		states: defaultStates,
		selected: 'all'
	},
	order: 'start_date:desc'
					
}, action) {
	switch (action.type) {
		case constants.VACANCIES_GET_VACANCIES:
		case constants.VACANCIES_GET_VACANCIES_SUCCESS: {
			return assign({}, state, {
				vacancies: receiveVacancies(state.vacancies, action),
				isFetching: isFetchingVacancies(state.isFetching, action),
				search: action.search,
				page: action.page,
				pages_count: action.pages_count,
				count: action.count,
				statusFilter: {
					states: concat(defaultStates, action.states || []),
					selected: action.state_id || 'all'
				},
				order: action.order
			});
		}
		
		case constants.VACANCIES_GET_VACANCIES_ON_SCROLL:
		case constants.VACANCIES_GET_VACANCIES_ON_SCROLL_SUCCESS: {
			return assign({}, state, {
				vacancies: receiveVacanciesOnScroll(state.vacancies, action),
				isFetchingScroll: isFetchingVacanciesScroll(state.isFetchingScroll, action),
				page: action.page
			});
		}

		default:
			return state;
	}
}

