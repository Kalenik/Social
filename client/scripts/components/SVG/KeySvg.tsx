import React, { SVGProps } from 'react';
import BaseSvg from './BaseSvg';

const KeySvgSvg: React.FC<SVGProps<SVGSVGElement>> = props => (
	<BaseSvg {...props}>
		<path d='M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-5l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z' />
	</BaseSvg>
);

export default KeySvgSvg;
