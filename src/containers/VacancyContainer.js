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
		return (
			<Vacancy {...this.props}/>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.vacancy };
}

export default connect(mapStateToProps, actionCreators)(VacancyContainer);