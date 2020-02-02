import AnimationWrapper from '@components/AnimationWrapper';
import Button from '@components/Button';
import Form from '@components/FormComponents/Form';
import InputField from '@components/FormComponents/InputField';
import TextareaField from '@components/FormComponents/TextareaField';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import ValidationRules from '@helpers/validationRules/EditUserValidationRules';
import IUser from '@interfaces/IUser';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import { setUserActionCreator } from '@reducers/UserReducer/UserActionCreators';
import UserService from '@services/UserService';
import React, { useContext } from 'react';
import useForm from 'react-hook-form';

const EditUserForm: React.FC = () => {
	const { register, watch, errors, handleSubmit } = useForm(),
		watchPassword = watch('newPassword'),
		{ token, authUser, authUserDispatch } = useContext(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext);

	const editUser = (
		username: string,
		email: string,
		city?: string,
		extraInfo?: string,
		newPassword?: string,
		currentPassword?: string
	): void => {
		setLoading(true);

		UserService.editUser(
			token,
			username,
			email,
			city,
			extraInfo,
			newPassword,
			currentPassword
		)
			.then((updatedUser: IUser) => {
				authUserDispatch(setUserActionCreator(updatedUser));

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`User ${updatedUser.username} is updated`
					)
				);
			})
			.catch((err: Array<Error>) =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return (
		<Form
			className='edit-user-form'
			onSubmit={handleSubmit(
				({
					username,
					email,
					city,
					extraInfo,
					newPassword,
					currentPassword
				}) =>
					editUser(
						username,
						email,
						city,
						extraInfo,
						newPassword,
						currentPassword
					)
			)}
		>
			<InputField
				defaultValue={authUser.username}
				name='username'
				placeholder='Your Name'
				error={errors.username}
				validationRules={register(ValidationRules.username)}
				required
			/>
			<InputField
				defaultValue={authUser.email}
				type='email'
				name='email'
				placeholder='Your Email'
				error={errors.email}
				validationRules={register(ValidationRules.email)}
				required
			/>
			<InputField
				defaultValue={authUser.city}
				name='city'
				placeholder='Your City'
				error={errors.city}
				validationRules={register}
			/>
			<TextareaField
				defaultValue={authUser.extraInfo}
				name='extraInfo'
				label='Extra Info'
				placeholder='Write something about you..'
				rows={3}
				error={errors.extraInfo}
				validationRules={register(ValidationRules.extraInfo)}
			/>
			<InputField
				type='password'
				name='newPassword'
				label='new password'
				placeholder='Your New Password'
				error={errors.newPassword}
				validationRules={register(ValidationRules.newPassword)}
			/>

			<AnimationWrapper
				dependence={watchPassword}
				className='edit-user-form__animation-wrapper'
				fadeOutAnimationName='fade-out-edit-user-form-animation-wrapper'
			>
				<InputField
					type='password'
					name='currentPassword'
					label='current password'
					placeholder='Your Current Password'
					error={errors.currentPassword}
					validationRules={register(ValidationRules.currentPassword)}
					required
				/>
			</AnimationWrapper>

			<div className='edit-user-form__actions'>
				<Button type='submit'>Save</Button>
			</div>
		</Form>
	);
};

export default EditUserForm;
