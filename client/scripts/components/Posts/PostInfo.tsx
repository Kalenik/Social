import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import { dateToNumber, processDate } from '@helpers/Utils';
import ILikedPost from '@interfaces/ILikedPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { deletePostActionCreator } from '@reducers/UserReducer/UserActionCreators';
import LikedPostService from '@services/LikedPostService';
import PostService from '@services/PostService';
import React, { useContext, useState } from 'react';

interface IPostInfoProps {
	postId: string;
	postTitle: string;
	postText: string;
	postCreated: string;
	postUpdated: string;
	isYourPost: boolean;
	deletePost: (deletedPostId: string) => void;
	modalCancelHandler: () => void;
}

type ConfirmTextType = 'Like' | 'Delete' | 'Close';

const PostInfo: React.FC<IPostInfoProps> = ({
	postId,
	postTitle,
	postText,
	postCreated,
	postUpdated,
	isYourPost,
	deletePost,
	modalCancelHandler
}) => {
	const { token, authUserDispatch } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[canCloseModal, setCloseModal] = useState(false),
		modalConfirmText: ConfirmTextType = token
			? isYourPost
				? 'Delete'
				: 'Like'
			: 'Close';

	const createdDate = processDate(postCreated),
		isUpdated = dateToNumber(postUpdated) > dateToNumber(postCreated);

	const likePostHandler = () =>
		LikedPostService.likePost(token, postId).then((likedPost: ILikedPost) =>
			noticeContextDispatch(
				addSuccessNoticesActionCreator(
					`Post: ${likedPost.post?.title} is liked`
				)
			)
		);

	const deletePostHandler = () =>
		PostService.deletePost(token, postId).then(() => {
			deletePost(postId);

			authUserDispatch(deletePostActionCreator(postId));

			noticeContextDispatch(
				addSuccessNoticesActionCreator(`Post: ${postTitle} is deleted`)
			);
		});

	const onConfirmHandler = () => {
		if (!token) {
			setCloseModal(true);
			return;
		}

		setLoading(true);

		(isYourPost ? deletePostHandler() : likePostHandler())
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				setCloseModal(true);
				setLoading(false);
			});
	};

	return (
		<Modal
			canCloseModal={canCloseModal}
			setCloseModal={setCloseModal}
			title={postTitle}
			onCancel={modalCancelHandler}
			onConfirm={onConfirmHandler}
			confirmText={modalConfirmText}
		>
			<div className='post-info'>
				<div className='post-info__date'>
					{isUpdated ? (
						<>
							<p>Updated:</p>
							<p>{processDate(postUpdated)}</p>
						</>
					) : (
						<p>{createdDate}</p>
					)}
				</div>
			</div>

			<p>{postText}</p>
		</Modal>
	);
};

export default PostInfo;
