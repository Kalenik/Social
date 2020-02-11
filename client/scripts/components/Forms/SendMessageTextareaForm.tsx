import Form from '@components/FormComponents/Form';
import TextareaField from '@components/FormComponents/TextareaField';
import useMessageTypingHandler from '@components/Messages/useMessageTypingHandler';
import ValidationRules from '@helpers/validationRules/SendMessageValidationRules';
import React, { useEffect, useRef } from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface ISendMessageTextareaFormProps {
	receiverName: string;
	errors: Partial<Record<string, FieldError>>;
	register: any;
	sendMessageHandler: (
		e: React.BaseSyntheticEvent<object, any, any>
	) => Promise<void>;
}

const SendMessageTextareaForm: React.FC<ISendMessageTextareaFormProps> = ({
	receiverName,
	errors,
	register,
	sendMessageHandler
}) => {
	const typingHandler = useMessageTypingHandler(receiverName),
		isSending = useRef(false);

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.which === 13 && !e.shiftKey) {
			!isSending.current ? sendMessageHandler(e) : e.preventDefault();
			isSending.current = true;
		} else {
			typingHandler();
		}
	};

	useEffect(() => {
		return () => {
			isSending.current = false;
		};
	}, []);

	return (
		<Form className='send-message-textarea-form'>
			<TextareaField
				name='message'
				isLabelShow={false}
				placeholder='Write something..'
				error={errors.message}
				validationRules={register(ValidationRules.message)}
				className='form-field send-message-textarea-form__form-field'
				onKeyPress={onKeyPressHandler}
				maxLength={100}
			/>
		</Form>
	);
};

export default SendMessageTextareaForm;
