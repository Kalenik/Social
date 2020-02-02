import Button from '@components/Button';
import Form from '@components/FormComponents/Form';
import InputField from '@components/FormComponents/InputField';
import ValidationRules from '@helpers/validationRules/SignInValidationRules';
import React from 'react';
import useForm from 'react-hook-form';

interface ISignInFormProps {
	signIn: (email: string, password: string) => void;
}

const SignInForm: React.FC<ISignInFormProps> = ({ signIn }) => {
	const { register, errors, handleSubmit } = useForm();

	return (
		<Form
			className='auth-form'
			onSubmit={handleSubmit(({ email, password }) =>
				signIn(email, password)
			)}
		>
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
			<div className='auth-form__actions'>
				<Button type='submit'>Sign in</Button>
			</div>
		</Form>
	);
};

export default SignInForm;
