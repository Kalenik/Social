import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const PlusSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z' />
	</BaseSvg>
);

export default PlusSvg;
