import Button from '@components/Button';
import EyeSvg from '@components/SVG/EyeSvg';
import {
	getCreatedOrUpdatedDateString,
	getTimeOrDateString
} from '@helpers/Utils';
import IPost from '@interfaces/IPost';
import React from 'react';

interface ILikedPostItemProps {
	likedPostId: string;
	likedPostCreated: string;
	showLikedPostInfo: (likedPostId: string) => void;
	post: IPost;
}

const LikedPostItem: React.FC<ILikedPostItemProps> = ({
	likedPostId,
	likedPostCreated,
	showLikedPostInfo,
	post
}) => (
	<li className='liked-post-item'>
		<div className='liked-post-item__content'>
			<div className='liked-post-item__liked-date'>
				Liked: {getTimeOrDateString(likedPostCreated)}
			</div>
			<div className='liked-post-item__title'>{post.title}</div>
			<div className='liked-post-item__date'>
				{getCreatedOrUpdatedDateString(post.created!, post.updated!)}
			</div>
		</div>
		<div className='liked-post-item__actions'>
			<Button
				className='btn liked-post-item__button'
				onClick={showLikedPostInfo.bind(null, likedPostId)}
			>
				<EyeSvg className='liked-post-item__eye' />
			</Button>
		</div>
	</li>
);

export default LikedPostItem;
