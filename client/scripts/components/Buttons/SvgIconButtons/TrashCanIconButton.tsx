import TrashCanSvg from '@components/SVG/TrashCanSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface ITrashCanIconButton extends React.SVGProps<SVGSVGElement> {}

const TrashCanIconButton: React.FC<ITrashCanIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={TrashCanSvg}
		className={
			className
				? `svg-icon-btn_trash-can ${className}`
				: 'svg-icon-btn_trash-can'
		}
	/>
);

export default TrashCanIconButton;
