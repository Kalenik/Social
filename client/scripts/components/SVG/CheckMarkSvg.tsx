import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const CheckMarkSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
	</BaseSvg>
);

export default CheckMarkSvg;
