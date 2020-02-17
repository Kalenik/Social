import { createContext } from 'react';

export interface IMessageContext {
	usernamesWithUnviewedMessages: Array<string>;
	setUsernamesWithUnviewedMessages: React.Dispatch<
		React.SetStateAction<string[]>
	>;
}

const defaultContext = {
	usernamesWithUnviewedMessages: [],
	setUsernamesWithUnviewedMessages: (): void => {}
};

export default createContext<IMessageContext>(defaultContext);
