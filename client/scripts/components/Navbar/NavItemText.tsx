import React from 'react';

interface INavItemTextProps {
	text: string;
}

const NavItemText: React.FC<INavItemTextProps> = ({ text }) => (
	<span className='main-navigation__item-text'>{text}</span>
);

export default NavItemText;
