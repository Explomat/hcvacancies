import React from 'react';
import cx from 'classnames';

import './style/compose-label.scss';

const ComposeLabel = ({ label, className, labelClassName, prevIconClassName, postIconClassName, onIconClick }) => {
	const classes = cx('compose-label', className);
	const labelClasses = cx('compose-label__label', labelClassName);
	const prevIconClasses = cx('compose-label__prev-icon', prevIconClassName);
	const postIconClasses = cx('compose-label__post-icon', postIconClassName);
	return (
		<span className={classes}>
			<i onClick={onIconClick} className={prevIconClasses} />
			<span className={labelClasses}>{label}</span>
			<i onClick={onIconClick} className={postIconClasses} />
		</span>
	);
};

ComposeLabel.propsTypes = {
	onIconClick: React.PropTypes.func,
	label: React.PropTypes.string.isRequired,
	className: React.PropTypes.string,
	labelClassName: React.PropTypes.string,
	prevIconClassName: React.PropTypes.string,
	postIconClassName: React.PropTypes.string
};

export default ComposeLabel;
