import EditUserForm from '@components/Forms/EditUserForm';
import React from 'react';

const EditUserPage: React.FC = () => {
	return (
		<div className='edit-user-page'>
			<h2 className='edit-user-page__header'>Edit your account</h2>
			<EditUserForm />
		</div>
	);
};

export default EditUserPage;
