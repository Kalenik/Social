import CheckMarkButton from '@components/Buttons/SvgButtons/CheckMarkButton';
import PostCreateForm from '@components/Forms/PostCreateForm';
import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import IPost from '@interfaces/IPost';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { addPostActionCreator } from '@reducers/UserReducer/UserActionCreators';
import PostService from '@services/PostService';
import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';

interface IPostCreatorProps {
	addPost: (createdPost: IPost) => void;
	createPostControl: (onClick: () => void) => JSX.Element;
}

const PostCreator: React.FC<IPostCreatorProps> = ({
	addPost,
	createPostControl
}) => {
	const { token, authUserDispatch } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[isModalOpen, setModal] = useState<boolean>(false),
		[canCloseModal, setCloseModal] = useState(false),
		{ register, errors, handleSubmit } = useForm();

	const createPostHandler = (): void => setModal(true);
	const modalCancelHandler = (): void => setModal(false);

	const modalConfirmHandler = handleSubmit(({ title, text }) => {
		setLoading(true);

		PostService.createPost(token, title, text)
			.then((createdPost: IPost) => {
				addPost(createdPost);

				authUserDispatch(addPostActionCreator(createdPost));

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`Post ${createdPost.title} is created`
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

	return token ? (
		<>
			{createPostControl(createPostHandler)}

			{isModalOpen && (
				<Modal
					canCloseModal={canCloseModal}
					setCloseModal={setCloseModal}
					title='Add Post'
					onCancel={modalCancelHandler}
					actions={modalActions}
				>
					<PostCreateForm register={register} errors={errors} />
				</Modal>
			)}
		</>
	) : null;
};

export default PostCreator;
