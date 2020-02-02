import Button from '@components/Button';
import { dateToNumber, processDate } from '@helpers/Utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface IPostItemProps {
	postId: string;
	title: string;
	created: string;
	updated: string;
	creatorName: string;
	isYourPost: boolean;
	showPostInfo: (postId: string) => void;
	showPostEditor: (postId: string) => void;
	isBadgeShow?: boolean;
}

const PostItem: React.FC<IPostItemProps> = ({
	postId,
	title,
	created,
	updated,
	creatorName,
	isYourPost,
	showPostInfo,
	showPostEditor,
	isBadgeShow
}) => {
	const createdDate = processDate(created),
		isUpdated = dateToNumber(updated) > dateToNumber(created);

	return (
		<li key={postId} className='post-item'>
			<div className='post-item__content'>
				<h1>{title}</h1>
				{isUpdated ? (
					<>
						<p>Updated:</p>
						<p>{processDate(updated)}</p>
					</>
				) : (
					<p>{createdDate}</p>
				)}
			</div>
			<div className='post-item__actions'>
				{isYourPost && (
					<Button
						className='btn post-item__button'
						onClick={showPostEditor.bind(null, postId)}
					>
						Edit
					</Button>
				)}
				<Button
					className='btn post-item__button'
					onClick={showPostInfo.bind(null, postId)}
				>
					View
				</Button>
			</div>
			{isBadgeShow &&
				(isYourPost ? (
					<div className='post-item__your-post-badge'>your</div>
				) : (
					<div className='post-item__creator-badge'>
						<span>by </span>
						<Link to={`/user/${creatorName}`}>{creatorName}</Link>
					</div>
				))}
		</li>
	);
};

export default PostItem;
