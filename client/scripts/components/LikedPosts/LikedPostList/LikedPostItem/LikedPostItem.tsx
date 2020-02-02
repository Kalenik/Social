import Button from '@components/Button';
import { processDate } from '@helpers/Utils';
import React from 'react';

interface ILikedPostItemProps {
	likedPostId: string;
	likedPostCreated: string;
	showLikedPostInfo: (likedPostId: string) => void;
	postTitle: string;
}

const LikedPostItem: React.FC<ILikedPostItemProps> = ({
	likedPostId,
	likedPostCreated,
	showLikedPostInfo,
	postTitle
}) => {
	return (
		<li className='liked-post-item'>
			<div className='liked-post-item__content'>
				<span>{postTitle}</span> was liked on{' '}
				<span>{processDate(likedPostCreated)}</span>
			</div>
			<div className='liked-post-item__actions'>
				<Button onClick={showLikedPostInfo.bind(null, likedPostId)}>
					View
				</Button>
			</div>
		</li>
	);
};

export default LikedPostItem;
