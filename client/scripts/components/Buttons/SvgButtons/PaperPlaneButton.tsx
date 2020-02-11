import PaperPlaneSvg from '@components/SVG/PaperPlaneSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IPaperPlaneButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const PaperPlaneButton: React.FC<IPaperPlaneButton> = props => (
	<SvgButton {...props}>
		<PaperPlaneSvg className='svg-btn__paper-plane' />
	</SvgButton>
);

export default PaperPlaneButton;
