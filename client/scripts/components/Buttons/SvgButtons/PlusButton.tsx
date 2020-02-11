import PlusSvg from '@components/SVG/PlusSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IPlusButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const PlusButton: React.FC<IPlusButton> = props => (
	<SvgButton {...props}>
		<PlusSvg className='svg-btn__plus' />
	</SvgButton>
);

export default PlusButton;
