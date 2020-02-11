import CheckMarkSvg from '@components/SVG/CheckMarkSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface ICheckMarkButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const CheckMarkButton: React.FC<ICheckMarkButton> = props => (
	<SvgButton {...props}>
		<CheckMarkSvg className='svg-btn__check-mark' />
	</SvgButton>
);

export default CheckMarkButton;
