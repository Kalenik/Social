import UserImage from '@components/Users/UserImage';
import UserFriendFollowerList from '@components/Users/UserInfo/UserFriendFollowerList';
import UserPageActions from '@components/Users/UserPageActions';
import UserPagePosts from '@components/Users/UserPagePosts';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import { setUserActionCreator } from '@reducers/UserReducer/UserActionCreators';
import userReducer, { initialUser } from '@reducers/UserReducer/UserReducer';
import UserService from '@services/UserService';
import React, { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router';

interface IRouteParams {
	username: string;
}

const UserPage: React.FC = () => {
	const { username: userNameFromRoute } = useParams<IRouteParams>(),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		{ authUser } = useContext(AuthContext),
		{ connectedUsernames } = useContext(SocketContext),
		[user, userDispatch] = useReducer(userReducer, initialUser);

	useEffect(() => {
		if (userNameFromRoute) {
			setLoading(true);

			UserService.fetchUser(userNameFromRoute)
				.then((fetchedUser: IUser) =>
					userDispatch(setUserActionCreator(fetchedUser))
				)
				.catch(err =>
					noticeContextDispatch(addErrorNoticesActionCreator(err))
				)
				.then(() => setLoading(false));
		} else {
			userDispatch(setUserActionCreator(authUser));
		}
	}, [userNameFromRoute]);

	return user._id ? (
		<div className='user-page'>
			<div className='user-page__image-actions'>
				<div
					className={
						connectedUsernames.indexOf(user.username) !== -1
							? 'user-page__image-wrapper user-page__image-wrapper_online'
							: 'user-page__image-wrapper'
					}
				>
					<UserImage
						src={user.profileImgSrc}
						width={150}
						height={150}
					/>
				</div>
				<UserPageActions
					userId={user._id}
					username={user.username}
					userDispatch={userDispatch}
				/>
			</div>

			<div className='user-page__info'>
				<h2 className='user-page__section-title'>{user.username}</h2>
				<UserFriendFollowerList
					friends={user.friends}
					following={user.following}
					followers={user.followers}
					username={user.username}
				/>
				<p className='user-page__email'>
					<span>Email:</span> {user.email}
				</p>
				<p className='user-page__city'>
					<span>City:</span> {user.city}
				</p>
				<p className='user-page__extra-info'>{user.extraInfo}</p>
			</div>

			<UserPagePosts
				posts={user.createdPosts}
				userDispatch={userDispatch}
			/>
		</div>
	) : null;
};

export default UserPage;
