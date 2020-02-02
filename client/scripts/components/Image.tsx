import React from 'react';

interface IImageProps
	extends React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> {
	circle?: boolean;
}

const Image: React.FC<IImageProps> = ({
	alt = 'Image',
	className,
	width = 100,
	height = 100,
	circle,
	...props
}) => {
	return (
		<img
			{...props}
			alt={alt}
			className={circle ? className + ' image_circle' : className}
			width={width}
			height={height}
		/>
	);
};

export default Image;
