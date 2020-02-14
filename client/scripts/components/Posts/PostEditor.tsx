import CheckMarkButton from '@components/Buttons/SvgButtons/CheckMarkButton';
import PostEditForm from '@components/Forms/PostEditForm';
import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import IPost from '@interfaces/IPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { editPostActionCreator } from '@reducers/UserReducer/UserActionCreators';
import postServiceEditPost from '@services/PostService/editPost';
import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';

interface IPostEditorProps {
	postId: string;
	postTitle: string;
	postText: string;
	editPost: (updatedPost: IPost) => void;
	modalCancelHandler: () => void;
}

const PostEditor: React.FC<IPostEditorProps> = ({
	postId,
	postTitle,
	postText,
	editPost,
	modalCancelHandler
}) => {
	const { token, authUserDispatch } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[canCloseModal, setCloseModal] = useState(false),
		{ register, errors, handleSubmit } = useForm();

	const modalConfirmHandler = handleSubmit(({ title, text }) => {
		setLoading(true);

		postServiceEditPost(token, postId, title, text)
			.then((updatedPost: IPost) => {
				editPost(updatedPost);

				authUserDispatch(editPostActionCreator(updatedPost));

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`Post ${updatedPost.title} is updated`
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
	});

	const modalActions = <CheckMarkButton onClick={modalConfirmHandler} />;

	return (
		<Modal
			canCloseModal={canCloseModal}
			setCloseModal={setCloseModal}
			title='Edit Post'
			onCancel={modalCancelHandler}
			actions={modalActions}
		>
			<PostEditForm
				register={register}
				errors={errors}
				postTitle={postTitle}
				postText={postText}
			/>
		</Modal>
	);
};

export default PostEditor;
