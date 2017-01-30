import React, { Component, PropTypes } from 'react';
import { AlertDanger } from '../components/modules/alert';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class AppContainer extends Component {
	
	constructor(props){
		super(props);
		this.handleBack = this.handleBack.bind(this);
	}
	
	handleBack(e){
		e.preventDefault();
		this.props.router.goBack();
	}
	
	render(){
		const { title, isFetching, access, errorMessage, children } = this.props;
		return (
			<div className='app-container'>
				<div className='app-container__header'>
					<a onClick={this.handleBack} href='#' className='icon-left-open-big app-container__back' />
					<span className='app-container__title'>{title}</span>
					{errorMessage && <AlertDanger text={errorMessage} onClose={this.props.errorReceive.bind(this, null)} />}
				</div>
				<div className='app-container__body'>
					{isFetching ? <h2>Loading...</h2> : access ? children : <h1>Доступ запрещен</h1>}
				</div>
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.node,
	isFetching: PropTypes.bool,
	errorMessage: PropTypes.string
};

function mapStateToProps(state) {
	const { title, isFetching, access, errorMessage } = state.app;
	return {
		title,
		isFetching,
		access,
		errorMessage
	};
}

export default connect(mapStateToProps, actionCreators)(AppContainer);