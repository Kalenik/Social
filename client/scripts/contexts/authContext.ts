import IUser from '@interfaces/IUser';
import {
	initialUser,
	userReducerActionType,
	userReducerStateType
} from '@reducers/UserReducer/UserReducer';
import { createContext } from 'react';

export interface IAuthContext {
	token: string;
	authUser: userReducerStateType;
	processAuthResponce: (
		user: IUser,
		accessToken: string,
		tokenExpiration: number
	) => void;
	logout: () => void;
	authUserDispatch: React.Dispatch<userReducerActionType>;
}

const defaultContext = {
	token: '',
	authUser: initialUser,
	processAuthResponce: (
		_user: IUser,
		_accessToken: string,
		_tokenExpiration: number
	): void => {},
	logout: (): void => {},
	authUserDispatch: (): void => {}
};

export default createContext<IAuthContext>(defaultContext);
