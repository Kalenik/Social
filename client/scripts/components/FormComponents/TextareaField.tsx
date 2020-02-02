import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import FormField from './FormField';

interface ITextareaFieldProps
	extends React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	name: string;
	label?: string;
	error?: FieldError;
	validationRules?:
		| string
		| ((instance: HTMLTextAreaElement | null) => void)
		| React.RefObject<HTMLTextAreaElement>
		| null
		| undefined;
	required?: boolean;
	className?: string;
	isLabelShow?: boolean;
}

const TextareaField: React.FC<ITextareaFieldProps> = ({
	name,
	label,
	error,
	validationRules,
	required,
	className,
	isLabelShow,
	...props
}) => (
	<FormField
		name={name}
		error={error}
		required={required}
		label={label}
		className={className}
		isLabelShow={isLabelShow}
	>
		<textarea {...props} name={name} ref={validationRules} />
	</FormField>
);

export default TextareaField;
