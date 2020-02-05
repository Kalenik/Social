import React from 'react';
import { Link } from 'react-router-dom';

interface INoMessages {
	username: string;
}

const NoMessages: React.FC<INoMessages> = ({ username }) => (
	<div className='no-messages'>
		<div className='no-messages__text'>
			<p className='no-messages__first-text-line'>
				No messages with{' '}
				{<Link to={`/user/${username}`}>{username}</Link>}.
			</p>
			<p>
				Go on {<Link to={`/user/${username}`}>{username}'s page</Link>}{' '}
				and push "Write Message".
			</p>
		</div>
	</div>
);

export default NoMessages;
