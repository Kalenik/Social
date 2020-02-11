import EditPencilSvg from '@components/SVG/EditPencilSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface IEditPencilIconButton extends React.SVGProps<SVGSVGElement> {}

const EditPencilIconButton: React.FC<IEditPencilIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={EditPencilSvg}
		className={
			className
				? `svg-icon-btn_edit-pencil ${className}`
				: 'svg-icon-btn_edit-pencil'
		}
	/>
);

export default EditPencilIconButton;
