import AuthContext from '@contexts/authContext';
import { userReducerActionType } from '@reducers/UserReducer/UserReducer';
import React, { useContext } from 'react';
import UserCreatePostButton from './UserActionButtons/UserCreatePostButton';
import UserEditButton from './UserActionButtons/UserEditButton';
import UserFollowButton from './UserActionButtons/UserFollowButton';
import UserMessageButton from './UserActionButtons/UserMessageButton';
import UserUnfollowButton from './UserActionButtons/UserUnFollowButton';

interface IUserPageActionsProps {
	userId: string;
	username: string;
	userDispatch: React.Dispatch<userReducerActionType>;
}

const UserPageActions: React.FC<IUserPageActionsProps> = ({
	userId,
	username,
	userDispatch
}) => {
	const { token, authUser } = useContext(AuthContext);

	const isFollow =
		authUser.following.some(following => following._id === userId) ||
		authUser.friends.some(friend => friend._id === userId);

	return token ? (
		<div className='user-page__actions'>
			{authUser._id !== userId ? (
				isFollow ? (
					<>
						<UserUnfollowButton
							className='btn user-page__button'
							userId={userId}
							userDispatch={userDispatch}
						/>
						<UserMessageButton
							className='btn user-page__button'
							receiverName={username}
						/>
					</>
				) : (
					<UserFollowButton
						className='btn user-page__button'
						userId={userId}
						userDispatch={userDispatch}
					/>
				)
			) : (
				<>
					<UserEditButton className='btn user-page__button' />
					<UserCreatePostButton
						className='btn user-page__button'
						userDispatch={userDispatch}
					/>
				</>
			)}
		</div>
	) : null;
};

export default UserPageActions;
