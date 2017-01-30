import React from 'react';

class Auth extends React.Component {
	
	_isDenied(name){
		const componentsDenied = this.props.componentsDenied;
		return componentsDenied.indexOf(name) !== -1;
	}

	render() {
		const children = this.props.children;
		if (!Array.isArray(children)) {
			return this._isDenied(children.type.name || children.type.displayName) ? null : children;
		}
		return null;
	}
}

Auth.propTypes = {
	componentsDenied: React.PropTypes.array,
	children: React.PropTypes.element
};

Auth.defaultProps = {
	componentsDenied: []
};

export default Auth;