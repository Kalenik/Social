import Image from '@components/Image';
import Config from '@config';
import React, { useEffect, useState } from 'react';

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
}) => {
	const [imageSrc, setImageSrc] = useState(
		src ? Config.host + src : require('@images/user.svg')
	);

	useEffect(() => {
		setImageSrc(() =>
			src ? Config.host + src : require('@images/user.svg')
		);
	}, [src]);

	const handleError = () => setImageSrc(() => require('@images/user.svg'));

	return (
		<Image
			src={imageSrc}
			alt='user image'
			className={className}
			width={width}
			height={height}
			circle
			onError={handleError}
		/>
	);
};

export default UserImage;
