import React from 'react';

interface IHamburgerMenuButtonProps {
	click: (
		e:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.KeyboardEvent<HTMLDivElement>
	) => void;
	isOpen: boolean;
}

const HamburgerMenuButton: React.FC<IHamburgerMenuButtonProps> = ({
	click,
	isOpen
}) => (
	<div
		className='hamburger-menu__button'
		onClick={click}
		onKeyPress={click}
		role='button'
		tabIndex={0}
	>
		<div
			className={
				isOpen
					? 'hamburger-menu__icon hamburger-menu__icon_active'
					: 'hamburger-menu__icon'
			}
		></div>
	</div>
);

export default HamburgerMenuButton;
