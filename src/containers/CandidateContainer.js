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
			<div className='candidate-container'>
				{isFetching ? <div className='overlay-loading overlay-loading--show' /> : <Candidate {...this.props}/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { states } = state.candidate;
	
	const viewStates = {};
	states.forEach(s => {
		viewStates[s.payload] = {
			text: s.text,
			color: s.color
		};
	});
	return { ...state.candidate, viewStates };
}

export default connect(mapStateToProps, actionCreators)(CandidateContainer);