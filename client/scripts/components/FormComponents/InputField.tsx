import React from 'react';
import { ElementLike, FieldError } from 'react-hook-form/dist/types';
import FormField from './FormField';

interface IInputFieldProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	name: string;
	label?: string;
	error?: FieldError;
	validationRules?: (ref: ElementLike | null) => void;
	isLabelShow?: boolean;
}

const InputField: React.FC<IInputFieldProps> = ({
	type = 'text',
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
		<input {...props} name={name} type={type} ref={validationRules} />
	</FormField>
);

export default InputField;
