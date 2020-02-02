import AuthContext, { IAuthContext } from '@contexts/authContext';
import NotFoundPage from '@pages/NotFoundPage';
import React, { lazy, Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from './Spinner';

const Home = lazy(() => import('@pages/Home')),
	LastMessagesPage = lazy(() => import('@pages/LastMessagesPage')),
	MessagesPage = lazy(() => import('@pages/MessagesPage')),
	PostPage = lazy(() => import('@pages/PostPage')),
	LikedPostPage = lazy(() => import('@pages/LikedPostPage')),
	UsersPage = lazy(() => import('@pages/UsersPage')),
	SignInPage = lazy(() => import('@pages/SignInPage')),
	SignUpPage = lazy(() => import('@pages/SignUpPage')),
	UserPage = lazy(() => import('@pages/UserPage')),
	EditUserPage = lazy(() => import('@pages/EditUserPage')),
	FriendFollowerPage = lazy(() => import('@pages/FriendFollowerPage'));

const Main: React.FC = () => {
	const { token } = useContext<IAuthContext>(AuthContext);

	return (
		// order is important
		<main>
			<Suspense fallback={<Spinner />}>
				<Switch>
					<Route exact path='/'>
						{token ? <UserPage /> : <Home />}
					</Route>

					{token && (
						<Route exact path='/messages'>
							<LastMessagesPage />
						</Route>
					)}

					{token && (
						<Route exact path='/messages/:username'>
							<MessagesPage />
						</Route>
					)}

					<Route exact path='/posts'>
						<PostPage />
					</Route>

					{token ? (
						<Route exact path='/user/edit'>
							<EditUserPage />
						</Route>
					) : (
						<Redirect from='/user/edit' to='/signin' exact />
					)}

					<Route exact path='/user/:username'>
						<UserPage />
					</Route>

					<Route
						exact
						path={[
							'/user/:username/friends',
							'/user/:username/following',
							'/user/:username/followers'
						]}
					>
						<FriendFollowerPage />
					</Route>

					{!token && (
						<Route exact path='/signin'>
							<SignInPage />
						</Route>
					)}

					{!token && (
						<Route exact path='/signup'>
							<SignUpPage />
						</Route>
					)}

					{token && (
						<Route exact path='/likedposts'>
							<LikedPostPage />
						</Route>
					)}

					<Route exact path='/users'>
						<UsersPage />
					</Route>

					{!token && <Redirect from='/messages' to='/signin' />}
					{!token && (
						<Redirect from='/likedposts' to='/signin' exact />
					)}

					{token && <Redirect from='/signin' to='/' exact />}
					{token && <Redirect from='/signup' to='/' exact />}

					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</Suspense>
		</main>
	);
};

export default Main;
