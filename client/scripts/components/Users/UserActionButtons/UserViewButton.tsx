import Button from '@components/Button';
import React from 'react';
import { useHistory } from 'react-router';

interface IUserViewButtonProps {
	className?: string;
	link: string;
}

const UserViewButton: React.FC<IUserViewButtonProps> = ({
	className,
	link
}) => {
	const history = useHistory(),
		goToUserPage = () => history.push(`/user/${link}`);

	return (
		<Button className={className} onClick={goToUserPage}>
			View
		</Button>
	);
};

export default UserViewButton;
