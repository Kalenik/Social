import SignUpForm from '@components/Forms/SignUpForm';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import AuthService from '@services/AuthService';
import React, { useContext } from 'react';

const SignUpPage: React.FC = () => {
	const { processAuthResponce } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext);

	const signUp = (
		username: string,
		email: string,
		password: string
	): void => {
		setLoading(true);

		AuthService.createUser(username, email, password)
			.then(({ user, accessToken, tokenExpiration }) => {
				processAuthResponce(user, accessToken, tokenExpiration);

				noticeContextDispatch(
					addSuccessNoticesActionCreator(
						`User created, email: ${email}`
					)
				);
			})
			.catch((err: Array<Error>) =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return (
		<>
			<h2 className='page-header page-header_auth'>
				Create your account
			</h2>
			<SignUpForm signUp={signUp} />
		</>
	);
};

export default SignUpPage;
