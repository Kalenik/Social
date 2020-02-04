import Button from '@components/Button';
import Modal from '@components/Modal';
import HeartMinusSvg from '@components/SVG/HeartMinusSvg';
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

	const modalActions = (
		<Button
			className='btn liked-post-info__button'
			onClick={onConfirmHandler}
		>
			<HeartMinusSvg className='liked-post-info__heart-minus' />
		</Button>
	);

	return (
		<Modal
			canCloseModal={canCloseModal}
			setCloseModal={setCloseModal}
			title={post.title}
			onCancel={modalCancelHandler}
			actions={modalActions}
		>
			<div className='liked-post-info'>
				<div className='liked-post-info__liked-date'>
					Liked: {processDate(selectedLikedPost.created!)}
				</div>
				<div className='liked-post-info__text'>{post.text}</div>

				<div className='liked-post-info__dates-creator'>
					<div className='liked-post-info__creator'>
						<span>Created by: </span>
						<Link
							className='liked-post-info__creator-link'
							to={`/user/${creatorName}`}
						>
							{creatorName}
						</Link>
					</div>

					<div className='liked-post-info__date'>
						{isPostUpdated ? (
							<p>Updated: {processDate(post.updated!)}</p>
						) : (
							<p>Created: {postCreatedDate}</p>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default LikedPostInfo;
