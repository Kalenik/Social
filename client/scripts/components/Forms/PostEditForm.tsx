import Form from '@components/FormComponents/Form';
import InputField from '@components/FormComponents/InputField';
import TextareaField from '@components/FormComponents/TextareaField';
import ValidationRules from '@helpers/validationRules/PostValidationRules';
import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface IPostEditFormProps {
	postTitle: string;
	postText: string;
	errors: Partial<Record<string, FieldError>>;
	register: any;
}

const PostEditForm: React.FC<IPostEditFormProps> = ({
	postTitle,
	postText,
	errors,
	register
}) => (
	<Form>
		<InputField
			defaultValue={postTitle}
			type='text'
			name='title'
			placeholder='Post title'
			error={errors.title}
			validationRules={register(ValidationRules.title)}
			required
		/>
		<TextareaField
			defaultValue={postText}
			name='text'
			label='post'
			placeholder='Write something..'
			rows={4}
			error={errors.text}
			validationRules={register(ValidationRules.text)}
			required
		/>
	</Form>
);

export default PostEditForm;
