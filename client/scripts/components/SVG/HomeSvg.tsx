import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const HomeSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z' />
	</BaseSvg>
);

export default HomeSvg;
