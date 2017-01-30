import React from 'react';
import cx from 'classnames';

import './style/panel.scss';

export const Panel = ({ className, ...props }) => {
	return (
		<div
			{...props}
			className={cx('panel-root', className)}
		/>
	);
};

export const PanelTitle = ({ className, ...props }) => {
	return (
		<h1
			{...props}
			className={cx('panel-title', className)}
		/>
	);
};

export const PanelHeader = ({ className, ...props })  => {
	return (
		<div
			{...props}
			className={cx('panel-header', className)}
		/>
	);
};

export const PanelBody = ({ className, ...props }) => {
	return (
		<div
			{...props}
			className={cx('panel-body', className)}
		/>
	);
};

export const PanelFooter = ({ className, ...props }) => {
	return (
		<div
			{...props}
			className={cx('panel-footer', className)}
		/>
	);
};