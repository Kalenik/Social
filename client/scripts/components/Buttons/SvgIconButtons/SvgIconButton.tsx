import React from 'react';

interface ISvgIconButton extends React.SVGProps<SVGSVGElement> {
	SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const SvgIconButton: React.FC<ISvgIconButton> = ({
	className,
	SvgIcon,
	...props
}) => (
	<SvgIcon
		{...props}
		className={`svg-icon-btn ${className}`}
		role='button'
		tabIndex={0}
	/>
);

export default SvgIconButton;
