import Button from '@components/Button';
import Form from '@components/FormComponents/Form';
import InputField from '@components/FormComponents/InputField';
import ValidationRules from '@helpers/validationRules/SignUpValidationRules';
import React from 'react';
import useForm from 'react-hook-form';

interface ISignUpFormProps {
	signUp: (username: string, email: string, password: string) => void;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({ signUp }) => {
	const { register, errors, handleSubmit } = useForm();

	return (
		<Form
			className='sign-up-form'
			onSubmit={handleSubmit(({ username, email, password }) =>
				signUp(username, email, password)
			)}
		>
			<InputField
				name='username'
				placeholder='Your Username'
				error={errors.username}
				validationRules={register(ValidationRules.username)}
				required
			/>
			<InputField
				type='email'
				name='email'
				placeholder='Your Email'
				error={errors.email}
				validationRules={register(ValidationRules.email)}
				required
			/>
			<InputField
				type='password'
				name='password'
				placeholder='Your Password'
				error={errors.password}
				validationRules={register(ValidationRules.password)}
				required
			/>

			<div className='sign-up-form__actions'>
				<Button type='submit'>Sign up</Button>
			</div>
		</Form>
	);
};

export default SignUpForm;
