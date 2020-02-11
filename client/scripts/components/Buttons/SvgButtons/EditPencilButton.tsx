import EditPencilSvg from '@components/SVG/EditPencilSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IEditPencilButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const EditPencilButton: React.FC<IEditPencilButton> = props => (
	<SvgButton {...props}>
		<EditPencilSvg className='svg-btn__pencil' />
	</SvgButton>
);

export default EditPencilButton;
