import Spinner from '@components/Spinner';
import UserList from '@components/Users/UserList/UserList';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import fetchUserSubscribers from '@services/UserService/fetchUserSubscribers';
import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

const FriendFollowerPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		{
			authUser: { username: authUserUsername }
		} = useContext(AuthContext),
		[isLoading, setLoading] = useState(true),
		[users, setUsers] = useState<Array<IUser>>([]),
		{
			url,
			params: { username }
		} = useRouteMatch(),
		subscribersType = url.split('/').pop();

	const isYourPage = authUserUsername === username;

	const isYourFriendBadgeShow = !(
		subscribersType === 'friends' && isYourPage
	);

	useEffect(() => {
		fetchUserSubscribers(username, subscribersType!)
			.then((users: Array<IUser>) => setUsers(users))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='friend-follower-page'>
			{users.length > 0 ? (
				<h2 className='friend-follower-page__header'>
					{isYourPage || username} {subscribersType}
				</h2>
			) : (
				<div className='friend-follower-page__no-users'>
					no {subscribersType}
				</div>
			)}

			<UserList
				users={users}
				isYourFriendBadgeShow={isYourFriendBadgeShow}
			/>
		</div>
	);
};

export default FriendFollowerPage;
