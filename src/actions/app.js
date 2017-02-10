import { get } from '../utils/ajax';
import config from '../config';
import constants from '../constants';

export function error(err){
	return {
		type: constants.APP_ERROR_MESSAGE,
		error: err
	};
}

export function getAccess(){
	return dispatch => {
		dispatch({ type: constants.APP_GET_ACCESS });
		
		const path = config.url.createPath({ server_name: 'Test', action_name: 'getAccess' });
		get(path)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(error(resp.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: resp });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getCandidate(vacancyId, candidateId){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Кандидат' });
		dispatch({ type: constants.CANDIDATES_GET_CANDIDATE });
		
		const path = config.url.createPath({
			server_name: 'Test',
			action_name: 'getCandidate',
			vacancy_id: vacancyId,
			candidate_id: candidateId
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(error(resp.error));
			} else {
				dispatch({ type: constants.CANDIDATES_GET_CANDIDATE_SUCCESS, response: resp });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getVacancy(vacancyId){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Вакансия' });
		dispatch({ type: constants.VACANCIES_GET_VACANCY });
		
		const path = config.url.createPath({
			server_name: 'Test',
			action_name: 'getVacancy',
			vacancy_id: vacancyId
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(error(resp.error));
			} else {
				dispatch({ type: constants.VACANCIES_GET_VACANCY_SUCCESS, response: resp });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getVacancies(search, page, state_id, order){
	return dispatch => {
		dispatch({ type: constants.APP_CHANGE_TITLE, title: 'Вакансии' });
		dispatch({ type: constants.VACANCIES_GET_VACANCIES });
		
		const path = config.url.createPath({
			server_name: 'Test',
			action_name: 'getVacancies',
			search,
			page,
			state_id,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(error(resp.error));
			} else {
				dispatch({
					type: constants.VACANCIES_GET_VACANCIES_SUCCESS,
					...resp,
					search,
					page,
					state_id,
					order
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getVacanciesOnScroll(search, page, state_id, order){
	return dispatch => {
		dispatch({ type: constants.VACANCIES_GET_VACANCIES_ON_SCROLL });
		
		const path = config.url.createPath({
			server_name: 'Test',
			action_name: 'getVacancies',
			search,
			page,
			state_id,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(error(resp.error));
			} else {
				dispatch({
					type: constants.VACANCIES_GET_VACANCIES_ON_SCROLL_SUCCESS,
					...resp,
					page,
					order
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function editBossPost(vacancyId, candidateId, post){
	return dispatch => {
		if (!post){
			dispatch(error('Комментарий не должен быть пустым!'));
			return;
		}
		
		/* dispatch({ type: constants.CANDIDATES_EDIT_BOSS_POST });
		setTimeout(() => {
			dispatch(error(null));
			dispatch({
				type: constants.CANDIDATES_EDIT_BOSS_POST_SUCCESS,
				candidate: editMockBossPost(vacancyId, candidateId, post)
			});
		}, 300);*/
	};
}


export function toggleEditBossPost(){
	return {
		type: constants.CANDIDATES_TOGGLE_EDIT_BOSS_POST
	};
}
