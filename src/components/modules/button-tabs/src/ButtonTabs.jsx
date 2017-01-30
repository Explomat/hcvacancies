import React from 'react';
import cx from 'classnames';

import './style/button-tabs.scss';

const ButtonTabs = ({ className, children }) => {
	const classes = cx('button-tabs', className);
	return (
		<div className={classes}>
			{children}
		</div>
	);
};

ButtonTabs.propTypes = {
	children: React.PropTypes.any,
	className: React.PropTypes.string
};

export default ButtonTabs;