import React from 'react';

interface ICloseButtonProps {
	click: (
		e:
			| React.MouseEvent<HTMLSpanElement, MouseEvent>
			| React.KeyboardEvent<HTMLSpanElement>
	) => void;
}

const CloseButton: React.FC<ICloseButtonProps> = ({ click }) => (
	<span
		className='close-btn'
		onClick={click}
		onKeyPress={click}
		role='button'
		tabIndex={0}
	>
		&times;
	</span>
);

export default CloseButton;
