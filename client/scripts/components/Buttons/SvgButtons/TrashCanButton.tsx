import TrashCanSvg from '@components/SVG/TrashCanSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface ITrashCanButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const TrashCanButton: React.FC<ITrashCanButton> = props => (
	<SvgButton {...props}>
		<TrashCanSvg className='svg-btn__trash-can' />
	</SvgButton>
);

export default TrashCanButton;
