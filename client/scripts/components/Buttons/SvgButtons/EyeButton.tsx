import EyeSvg from '@components/SVG/EyeSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IEyeButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const EyeButton: React.FC<IEyeButton> = props => (
	<SvgButton {...props}>
		<EyeSvg className='svg-btn__eye' />
	</SvgButton>
);

export default EyeButton;
