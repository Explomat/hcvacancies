import React from 'react';
import cx from 'classnames';
import listensToClickOutside from 'react-onclickoutside';

import './style/dropdown-icon.scss';

class _DropDownIcon extends React.Component {

	constructor(props){
		super(props);

		this.isRightBoundOverflow = false; // заезжает ли за правую границу экрана
		this.state = {
			display: false
		};
	}

	getChildContext(){
		return {
			onToggle: ::this.handleToggleDisplay
		};
	}

	componentDidMount(){
		this.isRightBoundOverflow = this._isRightBoundOverflow();
	}
	
	handleClickOutside() {
		this.setState({ display: false });
	}

	handleToggleDisplay(e) {
		this._stopPropagation(e);
		if (this._isChildren()) {
			this.setState({ display: !this.state.display });
		}
	}
	
	_isRightBoundOverflow(){
		const listContainer = this.refs.listContainer;
		const list = this.refs.list;

		const listContainerLeftBound = listContainer.getBoundingClientRect().left;
		const listWidth = list.offsetWidth;
		const windowWidth = window.innerWidth;
		return listContainerLeftBound + listWidth >= windowWidth;
	}

	_isChildren(children){
		return Array.isArray(children) ? children.length > 0 : (children !== null || children !== undefined);
	}

	_stopPropagation(e){
		if (!e || (!e.stopPropagation && !e.nativeEvent)) return;
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}

	render() {
		const isChildren = this._isChildren(this.props.children);
		const className = cx('dropdown-icon', this.props.className);
		const classNameList = cx({
			'dropdown-icon__list': true,
			'dropdown-icon__list--display': this.state.display,
			'dropdown-icon__list--display-right': this.state.display && this.isRightBoundOverflow
		}, this.props.classNameList);
		const caretClassName = cx({
			'dropdown-icon__caret': true,
			'dropdown-icon__caret--display': isChildren
		});
		return (
			<div className={className}>
				<div className='dropdown-icon__button' type='button' onClick={::this.handleToggleDisplay}>
					<span className='dropdown-icon__button-icon'>{this.props.icon}</span>
					<span className={caretClassName} />
				</div>
				<div ref='listContainer' className='dropdown-icon__list-container'>
					<ul ref='list' className={classNameList}>
						{this.props.children}
					</ul>
				</div>
			</div>
		);
	}
}

_DropDownIcon.PropTypes = {
	icon: React.PropTypes.any,
	className: React.PropTypes.string,
	classNameList: React.PropTypes.string
};

_DropDownIcon.childContextTypes = {
	onToggle: React.PropTypes.func
};

_DropDownIcon.defaultProps = {
	children: []
};

export default listensToClickOutside(_DropDownIcon);