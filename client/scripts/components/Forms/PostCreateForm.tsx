import Form from '@components/FormComponents/Form';
import InputField from '@components/FormComponents/InputField';
import TextareaField from '@components/FormComponents/TextareaField';
import ValidationRules from '@helpers/validationRules/PostValidationRules';
import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface IPostCreateFormProps {
	errors: Partial<Record<string, FieldError>>;
	register: any;
}

const PostCreateForm: React.FC<IPostCreateFormProps> = ({
	errors,
	register
}) => (
	<Form>
		<InputField
			type='text'
			name='title'
			placeholder='Post title'
			error={errors.title}
			validationRules={register(ValidationRules.title)}
			required
		/>
		<TextareaField
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

export default PostCreateForm;
