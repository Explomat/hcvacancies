import keyMirror from 'keyMirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_GET_ACCESS',
	
	'VACANCIES_GET_VACANCIES',
	'VACANCIES_GET_VACANCIES_ON_SCROLL',
	'VACANCIES_GET_VACANCY',
	'VACANCIES_SEARCH',
	'VACANCIES_CHANGE_STATUS',
	
	'CANDIDATES_GET_CANDIDATE',
	'CANDIDATES_EDIT_BOSS_POST'
]);

const constants = keyMirror({
	'APP_ERROR_MESSAGE': null,
	'APP_CHANGE_TITLE': null,
	'CANDIDATES_TOGGLE_EDIT_BOSS_POST': null
});

export default merge(remoteConstants, constants);