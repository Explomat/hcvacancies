import assign from 'lodash/assign';

export function setFailure(state, error, errorKey, fetchingKey){
	const newState = assign({}, state, { [errorKey]: error });

	delete newState[fetchingKey];
	return newState;
}

export function setSuccess(state, newState, errorKey, fetchingKey){
	const _newState = assign({}, state, newState);
	
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
}