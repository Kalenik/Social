import UserList from '@components/Users/UserList/UserList';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import UserService from '@services/UserService';
import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

const FriendFollowerPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		{
			authUser: { username: authUserUsername }
		} = useContext(AuthContext),
		setLoading = useContext(LoadingContext),
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
		setLoading(true);

		UserService.fetchUserSubscribers(username, subscribersType!)
			.then((users: Array<IUser>) => setUsers(users))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return (
		<>
			<h2 className='page-header'>
				{isYourPage || username} {subscribersType}
			</h2>
			<UserList
				users={users}
				isYourFriendBadgeShow={isYourFriendBadgeShow}
			/>
		</>
	);
};

export default FriendFollowerPage;
