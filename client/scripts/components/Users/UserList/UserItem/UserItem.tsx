import Button from '@components/Button';
import UserImage from '@components/Users/UserImage';
import AuthContext from '@contexts/authContext';
import IUser from '@interfaces/IUser';
import React, { useContext } from 'react';

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
							? 'user-item__image user-item__image_online'
							: 'user-item__image'
					}
				>
					<UserImage
						src={user.profileImgSrc}
						width={70}
						height={70}
					/>
				</div>

				<div className='user-item__content'>
					<p>{user.username}</p>
					<p>{user.email}</p>
				</div>
			</div>

			<div className='user-item__actions'>
				{token &&
					!isYou &&
					(isFollowing || isFriend ? (
						<Button
							className='btn user-item__button'
							onClick={unfollowHandler.bind(null, userId)}
						>
							Unfollow
						</Button>
					) : (
						<Button
							className='btn user-item__button'
							onClick={followHandler.bind(null, userId)}
						>
							Follow
						</Button>
					))}

				<Button
					className='btn user-item__button'
					onClick={goToUserPage.bind(null, user.username!)}
				>
					View
				</Button>
			</div>

			{isFriend && isYourFriendBadgeShow && (
				<div className='user-item__friend-badge'>friend</div>
			)}
		</li>
	);
};

export default UserItem;
