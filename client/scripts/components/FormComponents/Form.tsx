import React from 'react';

interface IFormProps
	extends React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> {
	children?: React.ReactNode;
}

const Form: React.FC<IFormProps> = ({
	children,
	className = 'form',
	...props
}) => (
	<form {...props} className={className}>
		{children}
	</form>
);

export default Form;
