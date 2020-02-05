import Button from '@components/Button';
import EditPencilSvg from '@components/SVG/EditPencilSvg';
import EyeSvg from '@components/SVG/EyeSvg';
import { getCreatedOrUpdatedDateString, processPostText } from '@helpers/Utils';
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
}) => (
	<li key={postId} className='post-item'>
		<div className='post-item__content'>
			<h1 className='post-item__title'>{title}</h1>
			<div className='post-item__text'>{processPostText(text)}</div>
			<div className='post-item__date'>
				{getCreatedOrUpdatedDateString(created, updated)}
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

export default PostItem;
