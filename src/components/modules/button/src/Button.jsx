import React from 'react';
import cx from 'classnames';

import './style/button.scss';

export const ButtonDefault = ({ text, className, disabled, loading, onClick, children, ...props }) => {
	const classes = cx({
		'button-default': true,
		'button-default--disabled': disabled
	}, className);
	return (
		<button
			type='button'
			{...props}
			disabled={disabled}
			className={classes}
			onClick={onClick}
		>
			{loading && <div className='overlay-loading overlay-loading--show' />}
			{text}
			{children}
		</button>
	);
};

export const ButtonPrimary = ({ className, reverse, ...props }) => {
	const classes = cx({
		'button-default--primary': true,
		'button-default--primary--reverse': reverse
	}, className);
	return <ButtonDefault {...props} className={classes}/>;
};

export const ButtonSuccess = ({ className, reverse, ...props }) => {
	const classes = cx({
		'button-default--success': true,
		'button-default--success--reverse': reverse
	}, className);
	return <ButtonDefault {...props} className={classes}/>;
};

export const ButtonInfo = ({ className, reverse, ...props }) => {
	const classes = cx({
		'button-default--info': true,
		'button-default--info--reverse': reverse
	}, className);
	return <ButtonDefault {...props} className={classes}/>;
};

export const ButtonWarning = ({ className, reverse, ...props }) => {
	const classes = cx({
		'button-default--warning': true,
		'button-default--warning--reverse': reverse
	}, className);
	return <ButtonDefault {...props} className={classes}/>;
};

export const ButtonDanger = ({ className, reverse, ...props }) => {
	const classes = cx({
		'button-default--danger': true,
		'button-default--danger--reverse': reverse
	}, className);
	return <ButtonDefault {...props} className={classes}/>;
};

ButtonDefault.propTypes = {
	text: React.PropTypes.string,
	onClick: React.PropTypes.func,
	className: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	loading: React.PropTypes.bool
};