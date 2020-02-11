import React from 'react';
import Button from '../Button';

interface ISvgButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: React.ReactNode;
}

const SvgButton: React.FC<ISvgButton> = ({ className, children, ...props }) => (
	<Button
		{...props}
		className={className ? `btn svg-btn ${className}` : 'btn svg-btn'}
	>
		{children}
	</Button>
);

export default SvgButton;
