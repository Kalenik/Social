import PaperPlaneSvg from '@components/SVG/PaperPlaneSvg';
import React from 'react';
import SvgIconButton from './SvgIconButton';

interface IPaperPlaneIconButton extends React.SVGProps<SVGSVGElement> {}

const PaperPlaneIconButton: React.FC<IPaperPlaneIconButton> = ({
	className,
	...props
}) => (
	<SvgIconButton
		{...props}
		SvgIcon={PaperPlaneSvg}
		className={
			className
				? `svg-icon-btn_paper-plane ${className}`
				: 'svg-icon-btn_paper-plane'
		}
	/>
);

export default PaperPlaneIconButton;
