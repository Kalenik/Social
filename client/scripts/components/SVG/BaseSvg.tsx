import React, { SVGProps } from 'react';

interface BaseSvg extends SVGProps<SVGSVGElement> {
	children: React.ReactNode;
}

const BaseSvg: React.FC<SVGProps<SVGSVGElement>> = ({
	children,
	fill = '#fff',
	width = 24,
	height = 24,
	viewBox = '0 0 24 24',
	xmlns = 'http://www.w3.org/2000/svg',
	xmlnsXlink = 'http://www.w3.org/1999/xlink',
	...props
}) => (
	<svg
		fill={fill}
		width={width}
		height={height}
		viewBox={viewBox}
		xmlns={xmlns}
		xmlnsXlink={xmlnsXlink}
		{...props}
	>
		{children}
	</svg>
);

export default BaseSvg;
