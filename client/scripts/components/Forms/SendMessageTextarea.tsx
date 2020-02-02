import Form from '@components/FormComponents/Form';
import TextareaField from '@components/FormComponents/TextareaField';
import useMessageTypingHandler from '@components/Messages/useMessageTypingHandler';
import ValidationRules from '@helpers/validationRules/SendMessageValidationRules';
import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface ISendMessageTextareaProps {
	receiverName: string;
	errors: Partial<Record<string, FieldError>>;
	register: any;
	sendMessageHandler: (
		e: React.BaseSyntheticEvent<object, any, any>
	) => Promise<void>;
}

const SendMessageTextarea: React.FC<ISendMessageTextareaProps> = ({
	receiverName,
	errors,
	register,
	sendMessageHandler
}) => {
	const typingHandler = useMessageTypingHandler(receiverName);

	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
		e.which === 13 && !e.shiftKey ? sendMessageHandler(e) : typingHandler();

	return (
		<Form>
			<TextareaField
				name='message'
				isLabelShow={false}
				placeholder='Write something..'
				rows={3}
				error={errors.message}
				validationRules={register(ValidationRules.message)}
				onKeyPress={onKeyPressHandler}
				maxLength={100}
			/>
		</Form>
	);
};

export default SendMessageTextarea;
