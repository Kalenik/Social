import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const LogoutSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M8 12v-4l8 7-8 7v-4h-8v-6h8zm2-5.024v-2.976h6v8.051l8 6.767v-16.818h-16v3.284l2 1.692z' />
	</BaseSvg>
);

export default LogoutSvg;
