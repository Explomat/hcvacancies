import merge from 'lodash/merge';

function createAction(action){
	const outObj = {};
	
	outObj[action] = action;
	outObj[`${action}_SUCCESS`] = `${action}_SUCCESS`;
	outObj[`${action}_FAILURE`] = `${action}_FAILURE`;
	return outObj;
}

export default function createRemoteActions(actions){
	if (!Array.isArray(actions)){
		throw new Error('Unknown input arguments!');
	}
	let outObj = {};
	
	actions.forEach(action => {
		const reducedAction = createAction(action);
		outObj = merge(outObj, reducedAction);
	});
	
	return outObj;
}
