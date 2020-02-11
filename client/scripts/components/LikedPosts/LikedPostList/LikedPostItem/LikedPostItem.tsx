import EyeButton from '@components/Buttons/SvgButtons/EyeButton';
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
			<EyeButton
				className='liked-post-item__button'
				onClick={showLikedPostInfo.bind(null, likedPostId)}
			/>
		</div>
	</li>
);

export default LikedPostItem;
