import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const ArrowUpSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z' />
	</BaseSvg>
);

export default ArrowUpSvg;
