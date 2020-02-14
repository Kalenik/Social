import PaperPlaneButton from '@components/Buttons/SvgButtons/PaperPlaneButton';
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
import sendMessage from '@services/MessageService/sendMessage';
import React, { useContext, useRef } from 'react';
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
		typingHandler = useMessageTypingHandler(receiverName),
		isSending = useRef(false);

	const sendMessageHandler = handleSubmit(({ message }) => {
		if (isSending.current) {
			return;
		}

		setLoading(true);

		isSending.current = true;

		sendMessage(token, receiverName, message)
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
			.then(() => {
				isSending.current = false;
				setLoading(false);
			});
	});

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
		e.which === 13 && !e.shiftKey ? sendMessageHandler(e) : typingHandler();

	return (
		<Form className='send-message-form' onSubmit={sendMessageHandler}>
			<TextareaField
				name='message'
				isLabelShow={false}
				placeholder='Write something..'
				error={errors.message}
				validationRules={register(ValidationRules.message)}
				className='form-field send-message-form__form-field'
				onKeyPress={onKeyPressHandler}
				maxLength={100}
			/>
			<div className='send-message-form__actions'>
				<PaperPlaneButton
					className='send-message-form__button'
					type='submit'
				/>
			</div>
		</Form>
	);
};

export default SendMessageForm;
