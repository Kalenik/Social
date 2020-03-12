import Image from '@components/Image';
import React, { useEffect, useState } from 'react';

interface IUserImageProps
	extends React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> {}

const UserImage: React.FC<IUserImageProps> = ({
	src,
	className = 'user-image',
	...props
}) => {
	const [imageSrc, setImageSrc] = useState(
		src || require('@images/user.svg')
	);

	useEffect(() => {
		setImageSrc(() => src || require('@images/user.svg'));
	}, [src]);

	const handleError = () => setImageSrc(() => require('@images/user.svg'));

	return (
		<Image
			{...props}
			src={imageSrc}
			alt='user image'
			className={className}
			circle
			onError={handleError}
		/>
	);
};

export default UserImage;
