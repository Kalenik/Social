import EditUserForm from '@components/Forms/EditUserForm';
import EditUserProfileImageForm from '@components/Forms/EditUserProfileImageForm';
import React from 'react';

const EditUserPage: React.FC = () => {
	return (
		<div className='edit-user-page'>
			<h2 className='edit-user-page__header'>Edit your account</h2>
			<EditUserProfileImageForm />
			<EditUserForm />
		</div>
	);
};

export default EditUserPage;
