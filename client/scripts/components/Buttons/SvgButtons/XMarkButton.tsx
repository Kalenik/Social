import XMarkSvg from '@components/SVG/XMarkSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IXMarkButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const XMarkButton: React.FC<IXMarkButton> = props => (
	<SvgButton {...props}>
		<XMarkSvg className='svg-btn__x-mark' />
	</SvgButton>
);

export default XMarkButton;
