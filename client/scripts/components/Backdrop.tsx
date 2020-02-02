import React from 'react';

interface IBackdropProps {
	click: (
		e:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.KeyboardEvent<HTMLDivElement>
	) => void;
	isCloseAnimation?: boolean;
}

const Backdrop: React.FC<IBackdropProps> = ({ click, isCloseAnimation }) => (
	<div
		className={isCloseAnimation ? 'backdrop backdrop_close' : 'backdrop'}
		onClick={click}
		onKeyPress={click}
		role='button'
		tabIndex={0}
	></div>
);

export default Backdrop;
