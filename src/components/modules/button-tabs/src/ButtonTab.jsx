import React from 'react';
import cx from 'classnames';

class ButtonTab extends React.Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		if (this.props.onClick){
			this.props.onClick(this.props.payload, this.props.value);
		}
	}

	render(){
		const classes = cx({
			'button-tabs__tab': true,
			'button-tabs__tab--selected': this.props.selected
		}, this.props.className);
		return (
			<button onClick={this.handleClick} className={classes}>{this.props.value}</button>
		);
	}
}

ButtonTab.propTypes = {
	payload: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	onClick: React.PropTypes.func,
	selected: React.PropTypes.bool,
	className: React.PropTypes.string
};

ButtonTab.defaultProps = {
	selected: false
};

export default ButtonTab;