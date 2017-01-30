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
		return (
			<Candidate {...this.props}/>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.candidate };
}

export default connect(mapStateToProps, actionCreators)(CandidateContainer);