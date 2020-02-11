import XMarkSvg from '@components/SVG/XMarkSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface IXMarkIconButton extends React.SVGProps<SVGSVGElement> {}

const XMarkIconButton: React.FC<IXMarkIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={XMarkSvg}
		className={
			className
				? `svg-icon-btn_x-mark ${className}`
				: 'svg-icon-btn_x-mark'
		}
	/>
);

export default XMarkIconButton;
