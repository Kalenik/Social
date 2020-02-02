import Image from '@components/Image';
import React from 'react';

interface IUserImageProps {
	src?: string;
	width?: number;
	height?: number;
	className?: string;
}

const UserImage: React.FC<IUserImageProps> = ({
	src,
	width,
	height,
	className = 'user-image'
}) => (
	<Image
		src={src || require('@images/user.svg')}
		alt='user image'
		className={className}
		width={width}
		height={height}
		circle
	/>
);

export default UserImage;
