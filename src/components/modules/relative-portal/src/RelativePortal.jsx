import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class RelativePortal extends Component {
	
	constructor(props) {
		super(props);

		if (props.node){
    		this.node = props.node;
		} else {
	    	this.node = document.createElement('div');
	    	document.body.appendChild(this.node);
		}
		this.state = {
			top: 0,
			left: 0
		};
	}

	componentDidMount() {
		this.handleResize = () => {
			const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
			const left = window.scrollX + rect.left;
			const top = window.scrollY + rect.top;

			if (top !== this.state.top || left !== this.state.left) {
				this.setState({ left, top });
			}
		};
    
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}
  
	render() {
		return <div />;
	}
  
	componentDidUpdate() {
	  	const newObj = { children: this.props.children, className: this.props.className };
		ReactDOM.render(
			<div
				{...newObj}
				style={{
					position: 'absolute',
					top: this.state.top + this.props.top,
					left: this.state.left + this.props.left
				}}
			/>,
	      this.node
	    );
	}
  
	componentWillUnmout() {
		document.body.removeChild(this.node);
	}
}

RelativePortal.propTypes = {
	node: PropTypes.any,
  	className: PropTypes.string,
	top: React.PropTypes.number,
	left: React.PropTypes.number
};

RelativePortal.defaultProps = {
	top: 0,
	left: 0
};

export default RelativePortal;