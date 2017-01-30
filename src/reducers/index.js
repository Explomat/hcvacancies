import { combineReducers } from 'redux';
import app from './app';
import vacanciesData from './vacanciesData';
import vacancy from './vacancy';
import candidate from './candidate';

export default combineReducers({
	app,
	vacanciesData,
	vacancy,
	candidate
});