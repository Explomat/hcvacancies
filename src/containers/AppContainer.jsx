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
	
	_isRootHash(){
		return window.location.hash === '#/';
	}
	
	render(){
		const { title, isFetching, access, errorMessage, children } = this.props;
		const isRootHash = this._isRootHash();
		return (
			<div className='app-container'>
				<div className='app-container__header'>
					{!isRootHash && <a onClick={this.handleBack} href='#' className='icon-left-open-big app-container__back' />}
					<span className='app-container__title'>{title}</span>
					{errorMessage &&
						<AlertDanger
							text={errorMessage}
							onClose={this.props.error.bind(this, null)}
							className='app-container__error'
						/>
					}
				</div>
				<div className='app-container__body'>
					{isFetching ? <h2>Запрос доступа...</h2> : access ? children : <h1>Доступ запрещен</h1>}
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