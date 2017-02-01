import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingCandidate(state = false, action){
	const { type } = action;
	
	if (type === constants.CANDIDATE_GET_CANDIDATE){
		return true;
	}
	return false;
}

export default function vacancy(state = {
	id: null,
	fullname: '',
	cvPath: '#',
	dateResponse: '',
	dateInterview: '',
	dateInvitation: '',
	comments: [],
	isFetching: false
}, action) {
	switch (action.type) {
		case constants.CANDIDATES_GET_CANDIDATE:
		case constants.CANDIDATES_GET_CANDIDATE_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingCandidate(state.isFetching, action) });

		default:
			return state;
	}
}

