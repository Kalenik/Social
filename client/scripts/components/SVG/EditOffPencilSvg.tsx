import React, { SVGProps } from 'react';

const EditOffPencilSvg: React.FC<SVGProps<SVGSVGElement>> = ({
	fill = '#fff',
	width = 16,
	height = 16,
	viewBox = '0 0 24 24',
	fillRule = 'evenodd',
	clipRule = 'evenodd',
	xmlns = 'http://www.w3.org/2000/svg',
	xmlnsXlink = 'http://www.w3.org/1999/xlink',
	...props
}) => (
	<svg
		fill={fill}
		width={width}
		height={height}
		viewBox={viewBox}
		fillRule={fillRule}
		clipRule={clipRule}
		xmlns={xmlns}
		xmlnsXlink={xmlnsXlink}
		{...props}
	>
		<path d='M8.117 10.226l.707.708-4.781 4.781 4.242 4.242 4.781-4.781.708.707-5.703 5.703-7.071 1.414 1.414-7.071 5.703-5.703zm1.408-1.408l7.818-7.818 5.657 5.657-7.818 7.818 6.818 6.818-.707.707-19.293-19.293.707-.707 6.818 6.818zm-1.947 11.847l-4.243-4.243-1.06 5.303 5.303-1.06zm2.654-11.14l4.243 4.243 7.111-7.111-4.243-4.243-7.111 7.111z' />
	</svg>
);

export default EditOffPencilSvg;
