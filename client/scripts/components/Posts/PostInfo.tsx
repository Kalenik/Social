import HeartPlusButton from '@components/Buttons/SvgButtons/HeartPlusButton';
import TrashCanButton from '@components/Buttons/SvgButtons/TrashCanButton';
import XMarkButton from '@components/Buttons/SvgButtons/XMarkButton';
import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import ILikedPost from '@interfaces/ILikedPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { deletePostActionCreator } from '@reducers/UserReducer/UserActionCreators';
import LikedPostService from '@services/LikedPostService';
import PostService from '@services/PostService';
import getCreatedOrUpdatedDateString from '@utils/getCreatedOrUpdatedDateString';
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

	const likePostHandler = (): void => {
		setLoading(true);

		LikedPostService.likePost(token, postId)
			.then((likedPost: ILikedPost) =>
				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`Post: ${likedPost.post?.title} is liked`
					)
				)
			)
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				setCloseModal(true);
				setLoading(false);
			});
	};

	const deletePostHandler = (): void => {
		setLoading(true);

		PostService.deletePost(token, postId)
			.then(() => {
				deletePost(postId);

				authUserDispatch(deletePostActionCreator(postId));

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`Post: ${postTitle} is deleted`
					)
				);
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				setCloseModal(true);
				setLoading(false);
			});
	};

	const modalActions = token ? (
		isYourPost ? (
			<TrashCanButton onClick={deletePostHandler} />
		) : (
			<HeartPlusButton onClick={likePostHandler} />
		)
	) : (
		<XMarkButton onClick={modalCancelHandler} />
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
