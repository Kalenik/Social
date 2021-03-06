import PicturesButton from '@components/Buttons/SvgButtons/PicturesButton';
import TrashCanButton from '@components/Buttons/SvgButtons/TrashCanButton';
import Form from '@components/FormComponents/Form';
import UserImage from '@components/Users/UserImage';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { setUserActionCreator } from '@reducers/UserReducer/UserActionCreators';
import userServiceDeleteAvatar from '@services/UserService/deleteAvatar';
import uploadAvatar from '@services/UserService/uploadAvatar';
import React, { useContext, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ImageEditor from '../ImageEditor';

const EditUserProfileImageForm: React.FC = () => {
	const {
			token,
			authUser: { profileImgSrc },
			authUserDispatch
		} = useContext(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[avatarImage, setAvatarImage] = useState<File | null>(null),
		avatarInput = useRef<HTMLInputElement>(null);

	const closeImageEditor = (): void => setAvatarImage(null);

	const handleEditing = (imageEditor: AvatarEditor): void => {
		setLoading(true);

		uploadAvatar(token, imageEditor.getImageScaledToCanvas().toDataURL())
			.then((profileImgSrc: string) => {
				authUserDispatch(setUserActionCreator({ profileImgSrc }));

				noticeContextDispatch(
					addSuccessNoticesActionCreator('Your avatar is updated')
				);
			})
			.catch((err: Array<Error>) =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				if (avatarInput.current) {
					avatarInput.current.value = '';
				}

				closeImageEditor();
				setLoading(false);
			});
	};

	const uploadImage = (): void => {
		avatarInput.current && avatarInput.current.click();
	};

	const deleteAvatar = (): void => {
		setLoading(true);

		userServiceDeleteAvatar(token)
			.then(() => {
				authUserDispatch(setUserActionCreator({ profileImgSrc: '' }));

				noticeContextDispatch(
					addSuccessNoticesActionCreator('Avatar is deleted')
				);
			})
			.catch((err: Array<Error>) =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	const onChangeAvatarInput = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		const avatarList = e.target.files;
		avatarList && setAvatarImage(avatarList.item(0));
	};

	return (
		<Form className='edit-user-profile-image-form'>
			{avatarImage ? (
				<div className='edit-user-profile-image-form__editor'>
					<ImageEditor
						imageToEdit={avatarImage}
						handleEditing={handleEditing}
						closeImageEditor={closeImageEditor}
					/>
				</div>
			) : (
				<div className='edit-user-profile-image-form__image-actions'>
					<UserImage
						className='user-image edit-user-profile-image-form__user-image'
						src={profileImgSrc}
						width={150}
						height={150}
						onClick={uploadImage}
						onKeyPress={uploadImage}
						role='button'
						tabIndex={0}
					/>

					<div className='edit-user-profile-image-form__actions'>
						<input
							ref={avatarInput}
							type='file'
							onChange={onChangeAvatarInput}
							className='edit-user-profile-image-form__avatar-iput'
						/>
						<PicturesButton
							className='edit-user-profile-image-form__button'
							onClick={uploadImage}
						/>
						<TrashCanButton
							className='edit-user-profile-image-form__button'
							onClick={deleteAvatar}
						/>
					</div>
				</div>
			)}
		</Form>
	);
};

export default EditUserProfileImageForm;
