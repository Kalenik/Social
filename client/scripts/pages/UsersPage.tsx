import UserList from '@components/Users/UserList/UserList';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import UserService from '@services/UserService';
import React, { useContext, useEffect, useState } from 'react';

const UsersPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		{
			authUser: { _id: exceptUserId }
		} = useContext(AuthContext),
		[users, setUsers] = useState<Array<IUser>>([]);

	useEffect(() => {
		setLoading(true);

		UserService.fetchUsers(exceptUserId)
			.then((users: Array<IUser>) => setUsers(users))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return (
		<div className='users-page'>
			<UserList users={users} isYourFriendBadgeShow />
		</div>
	);
};

export default UsersPage;
