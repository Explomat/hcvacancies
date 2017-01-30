import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { getAccess } from './actions';
import thunk from 'redux-thunk';
import logMiddleware from './middleware/logMiddleware';
import AppContainer from './containers/AppContainer';
import VacanciesContainer from './containers/VacanciesContainer';
import VacancyContainer from './containers/VacancyContainer';
import CandidateContainer from './containers/CandidateContainer';
import config from './config';

import 'classlist-polyfill';
import 'babel-polyfill';
import './styles';

const store = createStore(
  reducers,
  applyMiddleware(thunk, logMiddleware)
);

store.dispatch(getAccess());

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={AppContainer}>
				<IndexRoute component={VacanciesContainer} />
				<Route path='/vacancy/:vacancyId' component={VacancyContainer} />
				<Route path='/vacancy/:vacancyId/:candidateId' component={CandidateContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById(config.dom.appId)
);