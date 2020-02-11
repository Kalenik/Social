import HeartMinusSvg from '@components/SVG/HeartMinusSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IHeartMinusButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const HeartMinusButton: React.FC<IHeartMinusButton> = props => (
	<SvgButton {...props}>
		<HeartMinusSvg className='svg-btn__heart-minus' />
	</SvgButton>
);

export default HeartMinusButton;
