import Button from '@components/Button';
import EyeSvg from '@components/SVG/EyeSvg';
import { dateToNumber, processDate } from '@helpers/Utils';
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
}) => {
	const postCreatedDate = processDate(post.created!),
		isPostUpdated =
			dateToNumber(post.updated!) > dateToNumber(post.created!);

	return (
		<li className='liked-post-item'>
			<div className='liked-post-item__content'>
				<div className='liked-post-item__liked-date'>
					Liked: {processDate(likedPostCreated)}
				</div>
				<div className='liked-post-item__title'>{post.title}</div>
				<div className='liked-post-item__date'>
					{isPostUpdated ? (
						<p>Updated: {processDate(post.updated!)}</p>
					) : (
						<p>Created: {postCreatedDate}</p>
					)}
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
};

export default LikedPostItem;
