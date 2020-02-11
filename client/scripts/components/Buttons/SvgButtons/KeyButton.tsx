import KeySvg from '@components/SVG/KeySvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IKeyButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const KeyButton: React.FC<IKeyButton> = props => (
	<SvgButton {...props}>
		<KeySvg className='svg-btn__key' />
	</SvgButton>
);

export default KeyButton;
