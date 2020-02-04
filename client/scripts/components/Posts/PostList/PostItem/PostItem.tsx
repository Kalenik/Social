import Button from '@components/Button';
import EditPencilSvg from '@components/SVG/EditPencilSvg';
import EyeSvg from '@components/SVG/EyeSvg';
import { dateToNumber, processDate } from '@helpers/Utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface IPostItemProps {
	postId: string;
	title: string;
	text: string;
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
	text,
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

	const processText = (text: string): string =>
		text.length > 100 ? text.slice(0, 99) + '...' : text;

	return (
		<li key={postId} className='post-item'>
			<div className='post-item__content'>
				<h1 className='post-item__title'>{title}</h1>
				<div className='post-item__text'>{processText(text)}</div>
				<div className='post-item__date'>
					{isUpdated ? (
						<p>Updated: {processDate(updated)}</p>
					) : (
						<p>Created: {createdDate}</p>
					)}
				</div>
			</div>
			<div className='post-item__actions'>
				{isYourPost && (
					<Button
						className='btn post-item__button'
						onClick={showPostEditor.bind(null, postId)}
					>
						<EditPencilSvg className='post-item__pencil' />
					</Button>
				)}
				<Button
					className='btn post-item__button'
					onClick={showPostInfo.bind(null, postId)}
				>
					<EyeSvg className='post-item__eye' />
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
