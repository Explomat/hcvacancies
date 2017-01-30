import keyMirror from 'keyMirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_GET_ACCESS',
	
	'VACANCIES_GET_VACANCIES',
	'VACANCIES_GET_VACANCY',
	'VACANCIES_SEARCH',
	
	'CANDIDATES_GET_CANDIDATE'
]);

const constants = keyMirror({
	'APP_ERROR_MESSAGE': null,
	'APP_CHANGE_TITLE': null
});

export default merge(remoteConstants, constants);