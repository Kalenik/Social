import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface IFormFieldProps {
	children: React.ReactChild;
	name: string;
	label?: string;
	error?: FieldError;
	required?: boolean;
	className?: string;
	isLabelShow?: boolean;
}

const FormField: React.FC<IFormFieldProps> = ({
	children,
	name,
	label,
	error,
	required,
	className = 'form-field',
	isLabelShow = true
}) => (
	<div className={error ? `${className} form-field_error` : className}>
		{isLabelShow && <label htmlFor={name}>{label || name}</label>}
		{required && <span className='form-field_required'>*</span>}
		{children}
		{error?.message && (
			<div className='form-field__error-message'>{error.message}</div>
		)}
	</div>
);

export default FormField;
