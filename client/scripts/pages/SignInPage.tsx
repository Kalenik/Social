import SignInForm from '@components/Forms/SignInForm';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import AuthService from '@services/AuthService';
import React, { useContext } from 'react';

const SignInPage: React.FC = () => {
	const { processAuthResponce } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext);

	const signIn = (email: string, password: string): void => {
		setLoading(true);

		AuthService.login(email, password)
			.then(({ user, accessToken, tokenExpiration }) => {
				processAuthResponce(user, accessToken, tokenExpiration);

				noticeContextDispatch(
					addSuccessNoticesActionCreator('Successful Login')
				);
			})
			.catch((err: Array<Error>) =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return (
		<>
			<h2 className='page-header page-header_auth'>Login to Social</h2>
			<SignInForm signIn={signIn} />
		</>
	);
};

export default SignInPage;
