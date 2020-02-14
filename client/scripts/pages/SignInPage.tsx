import SignInForm from '@components/Forms/SignInForm';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import login from '@services/AuthService/login';
import React, { useContext } from 'react';

const SignInPage: React.FC = () => {
	const { processAuthResponce } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext);

	const signIn = (email: string, password: string): void => {
		setLoading(true);

		login(email, password)
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
		<div className='sign-in-page'>
			<h2 className='sign-in-page__header'>Login to Social</h2>
			<SignInForm signIn={signIn} />
		</div>
	);
};

export default SignInPage;
