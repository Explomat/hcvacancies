import constants from '../constants';
import assign from 'lodash/assign';

const filters =  [
	{ payload: 'all', text: 'Все вакансии' },
	{ payload: 'opened', text: 'Открытые' },
	{ payload: 'closed', text: 'Закрытые' },
	{ payload: 'active', text: 'В работе' }
];

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
	pagesCount: 1,
	statusFilter: {
		filters,
		selected: 'all'
	},
	orderedByTitle: false,
	orderedByStatus: false
					
}, action) {
	switch (action.type) {
		case constants.VACANCIES_GET_VACANCIES:
		case constants.VACANCIES_GET_VACANCIES_SUCCESS: {
			return assign({}, state, {
				vacancies: receiveVacancies(state.vacancies, action),
				isFetching: isFetchingVacancies(state.isFetching, action),
				search: action.search,
				page: action.page,
				pagesCount: action.pagesCount,
				statusFilter: {
					filters,
					selected: action.status || 'all'
				},
				orderedByTitle: action.orderedByTitle,
				orderedByStatus: action.orderedByStatus
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

