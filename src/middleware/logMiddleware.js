const logger = store => next => action => {
	if (process.env.NODE_ENV === 'development') {
		console.log('dispatching', action);
		console.log('next state', store.getState());
	}
	return next(action);
};

export default logger;