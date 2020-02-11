import HeartPlusSvg from '@components/SVG/HeartPlusSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IHeartPlusButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const HeartPlusButton: React.FC<IHeartPlusButton> = props => (
	<SvgButton {...props}>
		<HeartPlusSvg className='svg-btn__heart-plus' />
	</SvgButton>
);

export default HeartPlusButton;
