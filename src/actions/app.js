// import { get } from '../utils/ajax';
// import config from '../config';
import constants from '../constants';
import { getMockVacancies, getMockVacancy, getMockCandidate, editMockBossPost } from './mock';

export function error(err){
	return {
		type: constants.APP_ERROR_MESSAGE,
		error: err
	};
}

export function getAccess(){
	return dispatch => {
		dispatch({ type: constants.APP_GET_ACCESS });
		
		setTimeout(() => {
			// dispatch(errorReceive('Error'));
			dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: { access: true } });
		}, 300);
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
		}, 300);
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
		}, 300);
	};
}

export function getVacancies(search, page, state_id, orderedByTitle, orderedByStatus){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Вакансии' });
		dispatch({ type: constants.VACANCIES_GET_VACANCIES });
		
		setTimeout(() => {
			const data = getMockVacancies(search, page, state_id, orderedByTitle, orderedByStatus);
			dispatch({
				type: constants.VACANCIES_GET_VACANCIES_SUCCESS,
				...data,
				search,
				page,
				state_id
			});
		}, 300);
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

export function getVacanciesOnScroll(search, page, status, orderedByTitle, orderedByStatus){
	return dispatch => {
		dispatch({ type: constants.VACANCIES_GET_VACANCIES_ON_SCROLL });
		
		setTimeout(() => {
			const data = getMockVacancies(search, page, status, orderedByTitle, orderedByStatus);
			dispatch({
				type: constants.VACANCIES_GET_VACANCIES_ON_SCROLL_SUCCESS,
				vacancies:data.vacancies,
				pagesCount: data.pagesCount,
				page
			});
		}, 300);
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

export function editBossPost(vacancyId, candidateId, post){
	return dispatch => {
		if (!post){
			dispatch(error('Комментарий не должен быть пустым!'));
			return;
		}
		
		dispatch({ type: constants.CANDIDATES_EDIT_BOSS_POST });
		setTimeout(() => {
			dispatch(error(null));
			dispatch({
				type: constants.CANDIDATES_EDIT_BOSS_POST_SUCCESS,
				candidate: editMockBossPost(vacancyId, candidateId, post)
			});
		}, 300);
	};
}


export function toggleEditBossPost(){
	return {
		type: constants.CANDIDATES_TOGGLE_EDIT_BOSS_POST
	};
}
