// import { get } from '../utils/ajax';
// import config from '../config';
import constants from '../constants';
import { getMockVacancies, getMockVacancy, getMockCandidate } from './mock';

export function errorReceive(error){
	return {
		type: constants.APP_ERROR_MESSAGE,
		error
	};
}

export function getAccess(){
	return dispatch => {
		dispatch({ type: constants.APP_GET_ACCESS });
		
		setTimeout(() => {
			// dispatch(errorReceive('Error'));
			dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: { access: true } });
		}, 0);
		/* const path = config.url.createPath({ server_name: 'Test', action_name: 'getAccess' });
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorReceive(resp.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: resp });
			}
		})
		.catch(e => {
			dispatch(errorReceive(e.message));
		});*/
	};
}

export function getCandidate(vacancyId, candidateId){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Кандидат' });
		dispatch({ type: constants.CANDIDATES_GET_CANDIDATE });
		
		setTimeout(() => {
			dispatch({
				type: constants.CANDIDATES_GET_CANDIDATE_SUCCESS,
				response: getMockCandidate(vacancyId, candidateId)
			});
		}, 0);
	};
}

export function getVacancy(vacancyId){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Вакансия' });
		dispatch({ type: constants.VACANCIES_GET_VACANCY });
		
		setTimeout(() => {
			dispatch({
				type: constants.VACANCIES_GET_VACANCY_SUCCESS,
				response: getMockVacancy(vacancyId)
			});
		}, 0);
	};
}

export function getVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Вакансии' });
		dispatch({ type: constants.VACANCIES_GET_VACANCIES });
		
		setTimeout(() => {
			dispatch({
				type: constants.VACANCIES_GET_VACANCIES_SUCCESS,
				response: getMockVacancies(search, page, statusFilter, orderedByTitle, orderedByStatus)
			});
		}, 0);
		/* const path = config.url.createPath({ server_name: 'Test', action_name: 'getAccess' });
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorReceive(resp.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: resp });
			}
		})
		.catch(e => {
			dispatch(errorReceive(e.message));
		});*/
	};
}
