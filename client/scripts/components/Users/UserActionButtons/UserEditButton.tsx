import Button from '@components/Button';
import React from 'react';
import { useHistory } from 'react-router';

interface IUserEditButtonProps {
	className?: string;
}

const UserEditButton: React.FC<IUserEditButtonProps> = ({ className }) => {
	const history = useHistory(),
		goToEditUserPage = () => history.push('/user/edit');

	return (
		<Button className={className} onClick={goToEditUserPage}>
			Edit
		</Button>
	);
};

export default UserEditButton;
