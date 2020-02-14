import HeartMinusButton from '@components/Buttons/SvgButtons/HeartMinusButton';
import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import ILikedPost from '@interfaces/ILikedPost';
import IPost from '@interfaces/IPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import likedPostServiceDeleteLikedPost from '@services/LikedPostService/deleteLikedPost';
import getCreatedOrUpdatedDateString from '@utils/getCreatedOrUpdatedDateString';
import getTimeOrDateString from '@utils/getTimeOrDateString';
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

	const onConfirmHandler = () => {
		if (!token) {
			setCloseModal(true);
			return;
		}

		setLoading(true);

		likedPostServiceDeleteLikedPost(token, likedPostId)
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

	const modalActions = <HeartMinusButton onClick={onConfirmHandler} />;

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
					Liked: {getTimeOrDateString(selectedLikedPost.created!)}
				</div>
				<div className='liked-post-info__text'>{post.text}</div>

				<div className='liked-post-info__dates-creator'>
					<div className='liked-post-info__creator'>
						Created by:{' '}
						<Link
							className='liked-post-info__creator-link'
							to={`/user/${creatorName}`}
						>
							{creatorName}
						</Link>
					</div>

					<div className='liked-post-info__date'>
						{getCreatedOrUpdatedDateString(
							post.created!,
							post.updated!
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default LikedPostInfo;
