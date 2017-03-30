import { get, post } from '../utils/ajax';
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
		
		const path = config.url.createPath({ server_name: 'Test', action_name: 'Access' });
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: data });
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
			action_name: 'Candidate',
			vacancy_id: vacancyId,
			candidate_id: candidateId
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({ type: constants.CANDIDATES_GET_CANDIDATE_SUCCESS, response: data });
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
			action_name: 'Vacancy',
			vacancy_id: vacancyId
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({ type: constants.VACANCIES_GET_VACANCY_SUCCESS, response: data });
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
			action_name: 'Vacancies',
			search,
			page,
			state_id,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.VACANCIES_GET_VACANCIES_SUCCESS,
					...data,
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
			action_name: 'Vacancies',
			search,
			page,
			state_id,
			order
		});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.VACANCIES_GET_VACANCIES_ON_SCROLL_SUCCESS,
					...data,
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

export function editBossPost(vacancyId, candidateId, comment){
	return dispatch => {
		if (!(comment || '').trim()){
			dispatch(error('Комментарий не должен быть пустым!'));
			return;
		}
		dispatch({ type: constants.CANDIDATES_EDIT_BOSS_POST });
		
		const path = config.url.createPath({ server_name: 'Test', action_name: 'UpdateBossCommentForCandidate' });
		post(path, JSON.stringify({
			vacancy_id: vacancyId,
			candidate_id: candidateId,
			comment
		}))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch(error(null));
				dispatch({
					type: constants.CANDIDATES_EDIT_BOSS_POST_SUCCESS,
					candidate: data
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
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
