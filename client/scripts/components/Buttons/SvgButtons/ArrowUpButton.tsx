import ArrowUpSvg from '@components/SVG/ArrowUpSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IArrowUpButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const ArrowUpButton: React.FC<IArrowUpButton> = props => (
	<SvgButton {...props}>
		<ArrowUpSvg className='svg-btn__arrow-up' />
	</SvgButton>
);

export default ArrowUpButton;
