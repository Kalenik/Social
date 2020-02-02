import React from 'react';
import { Link } from 'react-router-dom';

interface INoMessages {
	username: string;
}

const NoMessages: React.FC<INoMessages> = ({ username }) => (
	<div className='no-messages'>
		<p>
			You don't have messages with{' '}
			{<Link to={`/user/${username}`}>{username}</Link>}.
		</p>
		<p>
			If you want send him a message, go on{' '}
			{<Link to={`/user/${username}`}>his page</Link>} and push "Write
			Message".
		</p>
	</div>
);

export default NoMessages;
