import React from 'react';
import { Link } from 'react-router-dom';

const NoLastMessages: React.FC = () => (
	<div className='no-last-messages'>
		<p>You don't have messages.</p>
		<p>
			If you want to send a message to someone, go to the{' '}
			{<Link to={`/users`}>"Users"</Link>} page, follow any user and push
			"Write Message" on his page.
		</p>
	</div>
);

export default NoLastMessages;
