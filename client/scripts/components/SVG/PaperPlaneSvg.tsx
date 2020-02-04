import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const PaperPlaneSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z' />
	</BaseSvg>
);

export default PaperPlaneSvg;
