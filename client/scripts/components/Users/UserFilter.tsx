import ItemFilter from '@components/ItemFilter';
import IUser from '@interfaces/IUser';
import React, { useEffect, useState } from 'react';

interface IUserFilterProps {
	users: Array<IUser>;
	filteredUsers: Array<IUser>;
	setFilteredUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const UserFilter: React.FC<IUserFilterProps> = ({
	users,
	filteredUsers,
	setFilteredUsers
}) => {
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setFilteredUsers(
			users.filter(
				({ username }) => username?.indexOf(filterValue) !== -1
			)
		);
	}, [filterValue, users]);

	return users.length > 0 ? (
		<>
			<ItemFilter
				setFilterValue={setFilterValue}
				className='user-filter'
			/>

			{filteredUsers.length < 1 && (
				<div className='user-filter__no-users'>No Users Found</div>
			)}
		</>
	) : null;
};

export default UserFilter;
