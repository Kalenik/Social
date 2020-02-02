import Form from '@components/FormComponents/Form';
import TextareaField from '@components/FormComponents/TextareaField';
import EditOffPencilSvg from '@components/SVG/EditOffPencilSvg';
import PaperPlaneSvg from '@components/SVG/PaperPlaneSvg';
import ValidationRules from '@helpers/validationRules/SendMessageValidationRules';
import React from 'react';
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
	const { register, errors, handleSubmit } = useForm();

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
			updateMessageHandler(e);
		}
	};

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
				<PaperPlaneSvg
					className='message-item__paper-plane'
					onClick={updateMessageHandler}
					onKeyPress={updateMessageHandler}
					role='button'
					tabIndex={0}
				/>
				<EditOffPencilSvg
					className='message-item__edit-off-pencil'
					onClick={deactivateUpdateMode}
					onKeyPress={deactivateUpdateMode}
					role='button'
					tabIndex={0}
				/>
			</div>
		</>
	);
};

export default EditMessageForm;
