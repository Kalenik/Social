import IUsernamesWithUnviewedMessagesCount from '@interfaces/IUsernamesWithUnviewedMessagesCount';
import { createContext } from 'react';

export interface IMessageContext {
	usernamesWithUnviewedMessagesCount: Array<
		IUsernamesWithUnviewedMessagesCount
	>;
	setUsernamesWithUnviewedMessagesCount: React.Dispatch<
		React.SetStateAction<IUsernamesWithUnviewedMessagesCount[]>
	>;
}

const defaultContext = {
	usernamesWithUnviewedMessagesCount: [],
	setUsernamesWithUnviewedMessagesCount: (): void => {}
};

export default createContext<IMessageContext>(defaultContext);
