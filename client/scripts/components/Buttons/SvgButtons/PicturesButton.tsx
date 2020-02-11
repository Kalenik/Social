import PicturesSvg from '@components/SVG/PicturesSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IPicturesButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const PicturesButton: React.FC<IPicturesButton> = props => (
	<SvgButton {...props}>
		<PicturesSvg className='svg-btn__pictures' />
	</SvgButton>
);

export default PicturesButton;
