import Spinner from '@components/Spinner';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import { setUserActionCreator } from '@reducers/UserReducer/UserActionCreators';
import userReducer, { initialUser } from '@reducers/UserReducer/UserReducer';
import authServiceLogout from '@services/AuthService/logout';
import refreshTokens from '@services/AuthService/refreshTokens';
import React, {
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState
} from 'react';

interface IAuthContextProvider {
	children?: React.ReactNode;
}

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
	const [token, setToken] = useState<string>(''),
		[isLoading, setLoading] = useState<boolean>(true),
		[authUser, authUserDispatch] = useReducer(userReducer, initialUser),
		noticeContextDispatch = useContext(NoticeContext),
		refreshTokenTimerId = useRef<number>();

	useEffect(() => {
		refreshToken().then(() => setLoading(false));
	}, []);

	const logout = () => {
		setLoading(true);

		clearTimeout(refreshTokenTimerId.current);

		authServiceLogout(token)
			.then((loggedOut: boolean) => {
				if (loggedOut) {
					setToken('');
					authUserDispatch(setUserActionCreator(initialUser));
				} else {
					noticeContextDispatch(
						addErrorNoticesActionCreator([
							new Error('Failed to logout')
						])
					);
				}
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	const refreshToken = (): Promise<void> =>
		refreshTokens()
			.then(({ user, accessToken, tokenExpiration }) =>
				processAuthResponce(user, accessToken, tokenExpiration)
			)
			.catch(() => {
				setToken('');
				authUserDispatch(setUserActionCreator(initialUser));
			});

	const processAuthResponce = (
		user: IUser,
		accessToken: string,
		tokenExpiration: number
	): void => {
		authUserDispatch(setUserActionCreator(user));
		setToken(accessToken);
		setRefreshTokenTimeout(tokenExpiration);
	};

	const setRefreshTokenTimeout = (tokenExpiration: number): void => {
		refreshTokenTimerId.current = window.setTimeout(
			refreshToken,
			(tokenExpiration - 2) * 1000 * 60 // 13 minutes
		);
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				authUser,
				processAuthResponce,
				logout,
				authUserDispatch
			}}
		>
			{isLoading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
