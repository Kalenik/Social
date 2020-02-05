import React from 'react';
import { Link } from 'react-router-dom';

const NoLastMessages: React.FC = () => (
	<div className='no-last-messages'>
		<div className='no-last-messages__text'>
			<p className='no-last-messages__first-text-line'>No messages.</p>
			<p>
				To send a message go to the {<Link to={`/users`}>Users</Link>}{' '}
				page, follow any user and push "Write Message" on his/her page.
			</p>
		</div>
	</div>
);

export default NoLastMessages;
