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
			isFetching ? <div className='overlay-loading overlay-loading--show' /> :
			<div className='vacancy-container'>
				<Vacancy {...this.props}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.vacancy };
}

export default connect(mapStateToProps, actionCreators)(VacancyContainer);