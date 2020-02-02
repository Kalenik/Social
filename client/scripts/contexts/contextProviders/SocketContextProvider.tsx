import Config from '@config';
import AuthContext from '@contexts/authContext';
import SocketContext from '@contexts/socketContext';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(Config.host, { reconnectionAttempts: 7 });

interface ISocketContextProvider {
	children?: React.ReactNode;
}

const SocketContextProvider: React.FC<ISocketContextProvider> = ({
	children
}) => {
	const {
			token,
			authUser: { username }
		} = useContext(AuthContext),
		[connectedUsernames, setConnectedUsernames] = useState<Array<string>>(
			[]
		);

	const deleteUserNameFromConnectedUsernames = (username: string) =>
		setConnectedUsernames(preConnectedUsernames =>
			preConnectedUsernames.filter(
				connectedUsername => connectedUsername !== username
			)
		);

	useEffect(() => {
		if (token) {
			socket.emit('user_connected', username);

			socket.on(
				'connected_usernames',
				(connectedUsernames: Array<string>) =>
					setConnectedUsernames(connectedUsernames)
			);

			socket.on('user_connected', (username: string) =>
				setConnectedUsernames(preConnectedUsernames =>
					preConnectedUsernames.indexOf(username) === -1
						? [...preConnectedUsernames, username]
						: preConnectedUsernames
				)
			);

			socket.on('user_logout', deleteUserNameFromConnectedUsernames);
			socket.on(
				'user_disconnected',
				deleteUserNameFromConnectedUsernames
			);
		} else {
			socket.emit('user_logout');
			socket.removeAllListeners();
		}
	}, [token]);

	return (
		<SocketContext.Provider value={{ socket, connectedUsernames }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContextProvider;
