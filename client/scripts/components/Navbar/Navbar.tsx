import EmailSvg from '@components/SVG/EmailSvg';
import HeartSvg from '@components/SVG/HeartSvg';
import HomeSvg from '@components/SVG/HomeSvg';
import KeySvg from '@components/SVG/KeySvg';
import LogoutSvg from '@components/SVG/LogoutSvg';
import PostsSvg from '@components/SVG/PostsSvg';
import UserPlusSvg from '@components/SVG/UserPlusSvg';
import UsersSvg from '@components/SVG/UsersSvg';
import UserSvg from '@components/SVG/UserSvg';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import MessagesContext from '@contexts/messageContext';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
	const {
			token,
			authUser: { username },
			logout
		} = useContext<IAuthContext>(AuthContext),
		{ usernamesWithUnviewedMessagesCount } = useContext(MessagesContext),
		unviewedMessagesCount = usernamesWithUnviewedMessagesCount
			.map(({ unviewedCount }) => unviewedCount)
			.reduce((acc, v) => acc + v, 0);

	return (
		<header className='main-navigation__header'>
			<nav className='main-navigation'>
				<NavLink
					className='main-navigation__item'
					exact
					to={username ? '/user/' + username : '/'}
					tabIndex={0}
				>
					{username ? (
						<UserSvg className='main-navigation__item-svg' />
					) : (
						<HomeSvg className='main-navigation__item-svg' />
					)}
				</NavLink>

				{token && (
					<NavLink
						className='main-navigation__item main-navigation__item_message'
						to='/messages'
						tabIndex={0}
						exact
					>
						<EmailSvg className='main-navigation__item-svg' />
						{unviewedMessagesCount > 0 && (
							<span className='main-navigation__unviewed-messages-count'>
								{unviewedMessagesCount}
							</span>
						)}
					</NavLink>
				)}
				<NavLink
					className='main-navigation__item'
					to='/posts'
					tabIndex={0}
				>
					<PostsSvg className='main-navigation__item-svg' />
				</NavLink>
				{token && (
					<NavLink
						className='main-navigation__item'
						to='/likedposts'
						tabIndex={0}
					>
						<HeartSvg className='main-navigation__item-svg' />
					</NavLink>
				)}
				<NavLink
					className='main-navigation__item'
					to='/users'
					tabIndex={0}
				>
					<UsersSvg className='main-navigation__item-svg' />
				</NavLink>
				{!token && (
					<>
						<NavLink
							className='main-navigation__item main-navigation__item_sign-up'
							to='/signup'
							tabIndex={0}
						>
							<UserPlusSvg className='main-navigation__item-svg' />
						</NavLink>
						<NavLink
							className='main-navigation__item'
							to='/signin'
							tabIndex={0}
						>
							<KeySvg className='main-navigation__item-svg' />
						</NavLink>
					</>
				)}
				{token && (
					<div
						className='main-navigation__item main-navigation__item_logout'
						onClick={logout}
						onKeyPress={logout}
						role='button'
						tabIndex={0}
					>
						<LogoutSvg className='main-navigation__item-svg' />
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
