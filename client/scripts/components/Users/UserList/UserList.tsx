import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import IUser from '@interfaces/IUser';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import {
	addFollowerActionCreator,
	addFollowingActionCreator,
	addFriendActionCreator,
	deleteFollowerActionCreator,
	deleteFollowingActionCreator,
	deleteFriendActionCreator
} from '@reducers/UserReducer/UserActionCreators';
import followUser from '@services/UserService/followUser';
import unfollowUser from '@services/UserService/unfollowUser';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import UserItem from './UserItem/UserItem';

interface IUserListProps {
	users: Array<IUser>;
	isYourFriendBadgeShow?: boolean;
}

const UserList: React.FC<IUserListProps> = ({
	users,
	isYourFriendBadgeShow
}) => {
	const history = useHistory(),
		{ token, authUserDispatch } = useContext(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		{ connectedUsernames } = useContext(SocketContext);

	const goToUserPage = (username: string): void =>
		history.push(`/user/${username}`);

	const followHandler = (userId: string): void => {
		setLoading(true);

		followUser(token, userId)
			.then(({ username, subscriberType }) => {
				if (subscriberType === 'friend') {
					authUserDispatch(deleteFollowerActionCreator(userId));
					authUserDispatch(addFriendActionCreator({ _id: userId }));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`Now You and ${username} are friends`
						)
					);
				}

				if (subscriberType === 'following') {
					authUserDispatch(
						addFollowingActionCreator({ _id: userId })
					);

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You following ${username}`
						)
					);
				}
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	const unfollowHandler = (userId: string): void => {
		setLoading(true);

		unfollowUser(token, userId)
			.then(({ username, subscriberType }) => {
				if (subscriberType === 'follower') {
					authUserDispatch(deleteFriendActionCreator(userId));
					authUserDispatch(addFollowerActionCreator({ _id: userId }));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You don't friends with ${username} anymore`
						)
					);
				}

				if (subscriberType === 'unknown') {
					authUserDispatch(deleteFollowingActionCreator(userId));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You unfollow ${username}`
						)
					);
				}
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return (
		<ul className='user-list'>
			{users.map(user => (
				<UserItem
					key={user._id}
					user={user}
					isYourFriendBadgeShow={isYourFriendBadgeShow}
					goToUserPage={goToUserPage}
					followHandler={followHandler}
					unfollowHandler={unfollowHandler}
					isOnline={connectedUsernames.indexOf(user.username!) !== -1}
				/>
			))}
		</ul>
	);
};

export default UserList;
