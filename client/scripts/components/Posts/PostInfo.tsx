import Button from '@components/Button';
import Modal from '@components/Modal';
import HeartPlusSvg from '@components/SVG/HeartPlusSvg';
import TrashCanSvg from '@components/SVG/TrashCanSvg';
import XMarkSvg from '@components/SVG/XMarkSvg';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import { getCreatedOrUpdatedDateString } from '@helpers/Utils';
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
		[canCloseModal, setCloseModal] = useState(false);

	const likePostHandler = (): Promise<void> =>
		LikedPostService.likePost(token, postId).then((likedPost: ILikedPost) =>
			noticeContextDispatch(
				addSuccessNoticesActionCreator(
					`Post: ${likedPost.post?.title} is liked`
				)
			)
		);

	const deletePostHandler = (): Promise<void> =>
		PostService.deletePost(token, postId).then(() => {
			deletePost(postId);

			authUserDispatch(deletePostActionCreator(postId));

			noticeContextDispatch(
				addSuccessNoticesActionCreator(`Post: ${postTitle} is deleted`)
			);
		});

	const onConfirmHandler = (): void => {
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

	const modalActions = (
		<Button className='btn post-info__button' onClick={onConfirmHandler}>
			{token ? (
				isYourPost ? (
					<TrashCanSvg className='post-info__trash-can' />
				) : (
					<HeartPlusSvg className='post-info__heart-plus' />
				)
			) : (
				<XMarkSvg className='post-info__x-mark' />
			)}
		</Button>
	);

	return (
		<Modal
			canCloseModal={canCloseModal}
			setCloseModal={setCloseModal}
			title={postTitle}
			onCancel={modalCancelHandler}
			actions={modalActions}
		>
			<div className='post-info'>
				<div className='post-info__text'>{postText}</div>
				<div className='post-info__date'>
					{getCreatedOrUpdatedDateString(postCreated, postUpdated)}
				</div>
			</div>
		</Modal>
	);
};

export default PostInfo;
