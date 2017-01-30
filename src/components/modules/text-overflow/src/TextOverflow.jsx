import React from 'react';

import './style/text-overflow.scss';

class TextOverflow extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isDisplayDots: false
		};
	}
	
	_changeDisplayDots(){
		if (this.refs.overflowText.offsetHeight > this.refs.overflowParent.offsetHeight) {
		  this.setState({ isDisplayDots: true });
		}		else this.setState({ isDisplayDots: false });
	}

	componentDidUpdate(){
		this._changeDisplayDots();
	}

	shouldComponentUpdate(nextProps, nextState){
		return (nextProps.value !== this.props.value || nextState.isDisplayDots !== this.state.isDisplayDots);
	}

	componentDidMount(){
		this._changeDisplayDots();
	}

	render() {
		const rowsCountClass = `text-overflow-box--${  this.props.rowsCount}`;
		const className = this.props.className ? this.props.className : '';
		const isDisplayDots = this.state.isDisplayDots ? 'text-overflow-box__dots--show' : '';
		return (
			<div ref='overflowParent' className={`text-overflow-box ${  rowsCountClass  } ${  className}`}>
				<p ref='overflowText' title={this.props.value} className='text-overflow-box__text'>{this.props.value}</p>
				<span className={`text-overflow-box__dots ${  isDisplayDots}`}>...</span>
			</div>
			
		);
	}
}

TextOverflow.propsTypes = {
	value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	rowsCount: React.PropTypes.number,
	className: React.PropTypes.string
};

TextOverflow.defaultProps = {
	rowsCount: 1
};

export default TextOverflow;