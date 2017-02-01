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
			isFetching ? <h1>Loading...</h1> : <Vacancy {...this.props}/>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.vacancy };
}

export default connect(mapStateToProps, actionCreators)(VacancyContainer);