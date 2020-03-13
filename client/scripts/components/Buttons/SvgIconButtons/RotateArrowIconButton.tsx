import RotateArrowSvg from '@components/SVG/RotateArrowSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface IRotateArrowIconButton extends React.SVGProps<SVGSVGElement> {}

const RotateArrowIconButton: React.FC<IRotateArrowIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={RotateArrowSvg}
		className={
			className
				? `svg-icon-btn_rotate-arrow ${className}`
				: 'svg-icon-btn_rotate-arrow'
		}
	/>
);

export default RotateArrowIconButton;
