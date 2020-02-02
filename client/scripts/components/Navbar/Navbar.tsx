import HamburgerMenuButton from '@components/HamburgerMenuButton';
import NavItemText from '@components/Navbar/NavItemText';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
	const [isMobileMenuOpen, setMobileMenu] = useState<boolean>(false),
		{
			token,
			authUser: { username },
			logout
		} = useContext<IAuthContext>(AuthContext);

	const hamburgerMenuButtonHandler = (): void =>
		setMobileMenu(!isMobileMenuOpen);

	const closeMobileMenu = () => setMobileMenu(false);

	return (
		<header className='main-navigation__header'>
			<nav className='main-navigation'>
				<NavLink
					className='main-navigation__item main-navigation__item_logo'
					exact
					to='/'
					onClick={closeMobileMenu}
					tabIndex={0}
				>
					<NavItemText text={username || 'Social'} />
				</NavLink>
				<div
					className={
						isMobileMenuOpen
							? 'main-navigation__items main-navigation__items_open'
							: 'main-navigation__items'
					}
					onClick={closeMobileMenu}
					role='presentation'
				>
					{token && (
						<NavLink
							className='main-navigation__item'
							to='/messages'
							tabIndex={0}
							exact
						>
							<NavItemText text='Messages' />
						</NavLink>
					)}
					<NavLink
						className='main-navigation__item'
						to='/posts'
						tabIndex={0}
					>
						<NavItemText text='Posts' />
					</NavLink>
					{token && (
						<NavLink
							className='main-navigation__item'
							to='/likedposts'
							tabIndex={0}
						>
							<NavItemText text='Liked' />
						</NavLink>
					)}
					<NavLink
						className='main-navigation__item'
						to='/users'
						tabIndex={0}
					>
						<NavItemText text='Users' />
					</NavLink>
					{!token && (
						<div className='main-navigation__items_right'>
							<NavLink
								className='main-navigation__item'
								to='/signup'
								tabIndex={0}
							>
								<NavItemText text='Sign up' />
							</NavLink>
							<NavLink
								className='main-navigation__item'
								to='/signin'
								tabIndex={0}
							>
								<NavItemText text='Sign in' />
							</NavLink>
						</div>
					)}
					{token && (
						<div
							className='main-navigation__item main-navigation__item_logout'
							onClick={logout}
							onKeyPress={logout}
							role='button'
							tabIndex={0}
						>
							<NavItemText text='Logout' />
						</div>
					)}
				</div>
				<div className='main-navigation__hamburger-menu-button'>
					<HamburgerMenuButton
						click={hamburgerMenuButtonHandler}
						isOpen={isMobileMenuOpen}
					/>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
