import EditOffPencilSvg from '@components/SVG/EditOffPencilSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface IEditOffPencilIconButton extends React.SVGProps<SVGSVGElement> {}

const EditOffPencilIconButton: React.FC<IEditOffPencilIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={EditOffPencilSvg}
		className={
			className
				? `svg-icon-btn_edit-off-pencil ${className}`
				: 'svg-icon-btn_edit-off-pencil'
		}
	/>
);

export default EditOffPencilIconButton;
