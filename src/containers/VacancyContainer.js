import React, { Component } from 'react';
import Vacancy from '../components/Vacancy';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class VacancyContainer extends Component {
	
	componentDidMount(){
		const { params } = this.props;
		this.props.getVacancy(params.vacancyId);
	}
	
	render(){
		const { isFetching } = this.props;
		return (
			<div className='vacancy-container'>
				{isFetching ? <div className='overlay-loading overlay-loading--show' /> : <Vacancy {...this.props}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { vacancyStates, candidateStates } = state.vacancy;
	
	const viewVacancyStates = {};
	vacancyStates.forEach(s => {
		viewVacancyStates[s.payload] = {
			text: s.text,
			color: s.color
		};
	});
	const viewCandidateStates = {};
	candidateStates.forEach(s => {
		viewCandidateStates[s.payload] = {
			text: s.text,
			color: s.color
		};
	});
	return { ...state.vacancy, viewVacancyStates, viewCandidateStates };
}

export default connect(mapStateToProps, actionCreators)(VacancyContainer);