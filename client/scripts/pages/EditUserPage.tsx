import EditUserForm from '@components/Forms/EditUserForm';
import React from 'react';

const EditUserPage: React.FC = () => {
	return (
		<>
			<h2 className='page-header page-header_edit'>Edit your account</h2>
			<EditUserForm />
		</>
	);
};

export default EditUserPage;
