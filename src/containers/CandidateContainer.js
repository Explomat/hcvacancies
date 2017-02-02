import React, { Component } from 'react';
import Candidate from '../components/Candidate';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class CandidateContainer extends Component {
	
	componentDidMount(){
		const { params } = this.props;
		this.props.getCandidate(params.vacancyId, params.candidateId);
	}
	
	render(){
		const { isFetching } = this.props;
		return (
			isFetching ? <div className='overlay-loading overlay-loading--show' /> :
			<div className='vacancy-container'>
				<Candidate {...this.props}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.candidate };
}

export default connect(mapStateToProps, actionCreators)(CandidateContainer);