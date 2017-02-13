import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingCandidate(state = false, action){
	const { type } = action;
	
	if (type === constants.CANDIDATES_GET_CANDIDATE){
		return true;
	}
	return false;
}

export default function candidate(state = {
	id: null,
	fullname: '',
	state_id: '',
	attachment_id: '#',
	comment: '',
	comments: [],
	states: [],
	boss_state_id: null,
	isFetching: true,
	isFetchingBossPost: false,
	isEditBossPost: false
}, action) {
	switch (action.type) {
		case constants.CANDIDATES_GET_CANDIDATE:
		case constants.CANDIDATES_GET_CANDIDATE_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingCandidate(state.isFetching, action) });
		
		case constants.CANDIDATES_EDIT_BOSS_POST:
			return assign({}, state, { isFetchingBossPost: true });
		case constants.CANDIDATES_EDIT_BOSS_POST_SUCCESS:
			return assign({}, state, action.candidate, { isFetchingBossPost: false, isEditBossPost: false });
			
		case constants.CANDIDATES_TOGGLE_EDIT_BOSS_POST:
			return assign({}, state, { isEditBossPost: !state.isEditBossPost });

		default:
			return state;
	}
}

