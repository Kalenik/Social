import { createContext } from 'react';

export interface ISocketContext {
	socket: SocketIOClient.Socket | null;
	connectedUsernames: Array<string>;
}

const defaultContext = {
	socket: null,
	connectedUsernames: []
};

export default createContext<ISocketContext>(defaultContext);
