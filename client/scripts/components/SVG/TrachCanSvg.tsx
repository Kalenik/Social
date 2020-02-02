import React, { SVGProps } from 'react';

const TrachCanSvg: React.FC<SVGProps<SVGSVGElement>> = ({
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
		<path d='M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z' />
	</svg>
);

export default TrachCanSvg;
