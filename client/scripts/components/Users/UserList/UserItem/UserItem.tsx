import EyeButton from '@components/Buttons/SvgButtons/EyeButton';
import UserMinusButton from '@components/Buttons/SvgButtons/UserMinusButton';
import UserPlusButton from '@components/Buttons/SvgButtons/UserPlusButton';
import UserImage from '@components/Users/UserImage';
import AuthContext from '@contexts/authContext';
import IUser from '@interfaces/IUser';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

interface IUserItemProps {
	user: IUser;
	isYourFriendBadgeShow?: boolean;
	goToUserPage: (username: string) => void;
	followHandler: (userId: string) => void;
	unfollowHandler: (userId: string) => void;
	isOnline: boolean;
}

const UserItem: React.FC<IUserItemProps> = ({
	user,
	isYourFriendBadgeShow,
	goToUserPage,
	followHandler,
	unfollowHandler,
	isOnline
}) => {
	const { token, authUser } = useContext(AuthContext),
		userId = user._id!,
		isYou = authUser._id === userId,
		isFriend = authUser.friends.some(friend => friend._id === userId),
		isFollowing = authUser.following.some(
			following => following._id === userId
		);

	return (
		<li className='user-item'>
			<div className='user-item__image-content'>
				<div
					className={
						isOnline
							? 'user-item__user-image-wrapper user-item__user-image-wrapper_online'
							: 'user-item__user-image-wrapper'
					}
				>
					<UserImage
						src={user.profileImgSrc}
						className='user-image user-item__user-image'
						width={75}
						height={75}
						onClick={goToUserPage.bind(null, user.username!)}
						onKeyPress={goToUserPage.bind(null, user.username!)}
						role='button'
						tabIndex={0}
					/>
				</div>

				<div className='user-item__content'>
					<Link
						className='user-item__username-link'
						to={`/user/${user.username}`}
					>
						{user.username}
					</Link>
					<p>{user.email}</p>
				</div>
			</div>

			<div className='user-item__actions'>
				{token &&
					!isYou &&
					(isFollowing || isFriend ? (
						<UserMinusButton
							className='user-item__button'
							onClick={unfollowHandler.bind(null, userId)}
						/>
					) : (
						<UserPlusButton
							className='user-item__button'
							onClick={followHandler.bind(null, userId)}
						/>
					))}

				<EyeButton
					className='user-item__button'
					onClick={goToUserPage.bind(null, user.username!)}
				/>
			</div>

			{isFriend && isYourFriendBadgeShow && (
				<div className='user-item__friend-badge'>friend</div>
			)}
		</li>
	);
};

export default UserItem;
