import EditPencilButton from '@components/Buttons/SvgButtons/EditPencilButton';
import React from 'react';
import { useHistory } from 'react-router';

interface IUserEditButtonProps {
	className?: string;
}

const UserEditButton: React.FC<IUserEditButtonProps> = ({ className }) => {
	const history = useHistory(),
		goToEditUserPage = () => history.push('/user/edit');

	return (
		<EditPencilButton className={className} onClick={goToEditUserPage} />
	);
};

export default UserEditButton;
