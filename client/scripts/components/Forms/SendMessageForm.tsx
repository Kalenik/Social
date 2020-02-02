import Button from '@components/Button';
import Form from '@components/FormComponents/Form';
import TextareaField from '@components/FormComponents/TextareaField';
import useMessageTypingHandler from '@components/Messages/useMessageTypingHandler';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import ValidationRules from '@helpers/validationRules/SendMessageValidationRules';
import IMessage from '@interfaces/IMessage';
import IMessageItemData from '@interfaces/IMessageItemData';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import MessageService from '@services/MessageService';
import React, { useContext } from 'react';
import useForm from 'react-hook-form';

interface ISendMessageFormProps {
	receiverName: string;
	addMessageToListData: (newMessageItemData: IMessageItemData) => void;
}

const SendMessageForm: React.FC<ISendMessageFormProps> = ({
	receiverName,
	addMessageToListData
}) => {
	const { token, authUser } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		{ register, errors, handleSubmit, reset } = useForm(),
		typingHandler = useMessageTypingHandler(receiverName);

	const sendMessageHandler = handleSubmit(({ message }) => {
		setLoading(true);

		MessageService.sendMessage(token, receiverName, message)
			.then((addedMessage: IMessage) => {
				reset({ message: '' });
				addMessageToListData({
					username: authUser.username,
					profileImgSrc: authUser.profileImgSrc,
					message: addedMessage
				});
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	});

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
		e.which === 13 && !e.shiftKey ? sendMessageHandler(e) : typingHandler();

	return (
		<Form className='message-form' onSubmit={sendMessageHandler}>
			<TextareaField
				name='message'
				isLabelShow={false}
				placeholder='Write something..'
				error={errors.message}
				validationRules={register(ValidationRules.message)}
				className='form-field message-form__form-field'
				onKeyPress={onKeyPressHandler}
				maxLength={100}
			/>
			<div className='message-form__actions'>
				<Button
					className='btn send-message-btn message-form__button'
					type='submit'
				/>
			</div>
		</Form>
	);
};

export default SendMessageForm;
