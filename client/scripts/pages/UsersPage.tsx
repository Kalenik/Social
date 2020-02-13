import Spinner from '@components/Spinner';
import UserFilter from '@components/Users/UserFilter';
import UserList from '@components/Users/UserList/UserList';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import UserService from '@services/UserService';
import React, { useContext, useEffect, useState } from 'react';

const UsersPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		{
			authUser: { _id: exceptUserId }
		} = useContext(AuthContext),
		[isLoading, setLoading] = useState(true),
		[users, setUsers] = useState<Array<IUser>>([]),
		[filteredUsers, setFilteredUsers] = useState(users);

	useEffect(() => {
		UserService.fetchUsers(exceptUserId)
			.then((users: Array<IUser>) => setUsers(users))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='users-page'>
			<UserFilter
				users={users}
				filteredUsers={filteredUsers}
				setFilteredUsers={setFilteredUsers}
			/>

			<UserList users={filteredUsers} isYourFriendBadgeShow />

			{users.length < 1 && (
				<div className='users-page__no-users'>No Users</div>
			)}
		</div>
	);
};

export default UsersPage;
