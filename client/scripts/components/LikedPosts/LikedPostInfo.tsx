import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import { dateToNumber, processDate } from '@helpers/Utils';
import ILikedPost from '@interfaces/ILikedPost';
import IPost from '@interfaces/IPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import LikedPostService from '@services/LikedPostService';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

interface ILikedPostInfoProps {
	selectedLikedPost: ILikedPost;
	deleteLikedPost: (likedPostId: string) => void;
	modalCancelHandler: () => void;
}

const LikedPostInfo: React.FC<ILikedPostInfoProps> = ({
	selectedLikedPost,
	deleteLikedPost,
	modalCancelHandler
}) => {
	const { token } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[canCloseModal, setCloseModal] = useState(false),
		likedPostId: string = selectedLikedPost._id!,
		post: IPost = selectedLikedPost.post!,
		creatorName: string = post.creator?.username!;

	const postCreatedDate = processDate(post.created!),
		isPostUpdated =
			dateToNumber(post.updated!) > dateToNumber(post.created!);

	const onConfirmHandler = () => {
		if (!token) {
			setCloseModal(true);
			return;
		}

		setLoading(true);

		LikedPostService.deleteLikedPost(token, likedPostId)
			.then((deleteLikedPostRezult: IPost) => {
				deleteLikedPost(likedPostId);

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`Post: ${deleteLikedPostRezult.title} is deleted from liked`
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

	return (
		<Modal
			canCloseModal={canCloseModal}
			setCloseModal={setCloseModal}
			title={post.title}
			onCancel={modalCancelHandler}
			onConfirm={onConfirmHandler}
			confirmText='Cancel'
		>
			<div className='post-info'>
				<div className='post-info'>
					<div className='post-info__date'>
						{isPostUpdated ? (
							<>
								<p>Updated:</p>
								<p>{processDate(post.updated!)}</p>
							</>
						) : (
							<p>{postCreatedDate}</p>
						)}
					</div>
				</div>

				<p>{post.text}</p>
				<p className='post-info__creator'>
					<span>Created by </span>
					<Link
						className='post-info__creator-link'
						to={`/user/${creatorName}`}
					>
						{creatorName}
					</Link>
				</p>
			</div>
		</Modal>
	);
};

export default LikedPostInfo;
