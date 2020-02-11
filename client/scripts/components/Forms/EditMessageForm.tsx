import EditOffPencilIconButton from '@components/Buttons/SvgIconButtons/EditOffPencilIconButton';
import PaperPlaneIconButton from '@components/Buttons/SvgIconButtons/PaperPlaneIconButton';
import Form from '@components/FormComponents/Form';
import TextareaField from '@components/FormComponents/TextareaField';
import ValidationRules from '@helpers/validationRules/SendMessageValidationRules';
import React, { useEffect, useRef } from 'react';
import useForm from 'react-hook-form';

interface IEditMessageFormProps {
	messageText: string;
	onUpdateMessage: (newMessageText: string) => void;
	deactivateUpdateMode: () => void;
}

const EditMessageForm: React.FC<IEditMessageFormProps> = ({
	messageText,
	onUpdateMessage,
	deactivateUpdateMode
}) => {
	const { register, errors, handleSubmit } = useForm(),
		isSending = useRef(false);

	const updateMessageHandler = handleSubmit(({ message }) => {
		if (message === messageText) {
			deactivateUpdateMode();
			return;
		}

		onUpdateMessage(message);
	});

	const onKeyPressHandler = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	): void => {
		if (e.which === 13 && !e.shiftKey) {
			!isSending.current ? updateMessageHandler(e) : e.preventDefault();
			isSending.current = true;
		}
	};

	useEffect(() => {
		return () => {
			isSending.current = false;
		};
	}, []);

	return (
		<>
			<Form
				className='message-item__edit-message-form'
				onSubmit={updateMessageHandler}
			>
				<TextareaField
					name='message'
					defaultValue={messageText}
					rows={1}
					isLabelShow={false}
					placeholder='Edit Message'
					error={errors.message}
					validationRules={register(ValidationRules.message)}
					className='form-field message-item__edit-message-field'
					onKeyPress={onKeyPressHandler}
					maxLength={100}
				/>
			</Form>
			<div className='message-item__edit-message-actions'>
				<PaperPlaneIconButton
					className='message-item__paper-plane'
					onClick={updateMessageHandler}
					onKeyPress={updateMessageHandler}
				/>
				<EditOffPencilIconButton
					className='message-item__edit-off-pencil'
					onClick={deactivateUpdateMode}
					onKeyPress={deactivateUpdateMode}
				/>
			</div>
		</>
	);
};

export default EditMessageForm;
