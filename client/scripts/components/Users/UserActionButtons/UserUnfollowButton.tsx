import UserMinusButton from '@components/Buttons/SvgButtons/UserMinusButton';
import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import {
	addFollowerActionCreator,
	addFollowingActionCreator,
	deleteFollowerActionCreator,
	deleteFollowingActionCreator,
	deleteFriendActionCreator
} from '@reducers/UserReducer/UserActionCreators';
import { userReducerActionType } from '@reducers/UserReducer/UserReducer';
import unfollowUser from '@services/UserService/unfollowUser';
import React, { useContext } from 'react';

interface IUserUnfollowButtonProps {
	className?: string;
	userId: string;
	userDispatch: React.Dispatch<userReducerActionType>;
}

const UserUnfollowButton: React.FC<IUserUnfollowButtonProps> = ({
	className,
	userId,
	userDispatch
}) => {
	const {
			token,
			authUser: { _id: authUserId },
			authUserDispatch
		} = useContext(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext);

	const unfollowHandler = (): void => {
		setLoading(true);

		unfollowUser(token, userId)
			.then(({ username, subscriberType }) => {
				if (subscriberType === 'follower') {
					authUserDispatch(deleteFriendActionCreator(userId));
					authUserDispatch(addFollowerActionCreator({ _id: userId }));

					userDispatch(deleteFriendActionCreator(authUserId));
					userDispatch(
						addFollowingActionCreator({ _id: authUserId })
					);

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You don't friends with ${username} anymore`
						)
					);
				}

				if (subscriberType === 'unknown') {
					authUserDispatch(deleteFollowingActionCreator(userId));

					userDispatch(deleteFollowerActionCreator(authUserId));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You unfollow ${username}`
						)
					);
				}
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return <UserMinusButton className={className} onClick={unfollowHandler} />;
};

export default UserUnfollowButton;
