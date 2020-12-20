import * as React from 'react';

const Icon = (Icon) => ({className, width, height, color, style}) => {
	const element = <Icon />;
	const props = {
		className: 'icon' + (className ? ` ${className}` : ''),
	};
	if (width) props.width = typeof width === 'string' ? width : `${width}px`;
	if (height)
		props.height = typeof height === 'string' ? height : `${height}px`;
	if (color) props.className += ` ${color}`;
	if (style) props.style = {...props.style, ...style};
	return React.cloneElement(element, {
		...element.props,
		...props,
	});
};

export const LogoIcon = Icon(require('../images/icons/diinno.svg'));
