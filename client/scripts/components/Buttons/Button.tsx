import React from 'react';

interface IButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children?: React.ReactNode;
}

const Button: React.FC<IButton> = ({
	type = 'button',
	className = 'btn',
	children,
	...props
}) => (
	<button {...props} type={type} className={className}>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		{children}
	</button>
);

export default Button;
