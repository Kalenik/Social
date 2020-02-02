import Button from '@components/Button';
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
	addFriendActionCreator,
	deleteFollowerActionCreator,
	deleteFollowingActionCreator
} from '@reducers/UserReducer/UserActionCreators';
import { userReducerActionType } from '@reducers/UserReducer/UserReducer';
import UserService from '@services/UserService';
import React, { useContext } from 'react';

interface IUserFollowButtonProps {
	className?: string;
	userId: string;
	userDispatch: React.Dispatch<userReducerActionType>;
}

const UserFollowButton: React.FC<IUserFollowButtonProps> = ({
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

	const followHandler = (): void => {
		setLoading(true);

		UserService.followUser(token, userId)
			.then(({ username, subscriberType }) => {
				if (subscriberType === 'friend') {
					authUserDispatch(deleteFollowerActionCreator(userId));
					authUserDispatch(addFriendActionCreator({ _id: userId }));

					userDispatch(deleteFollowingActionCreator(authUserId));
					userDispatch(addFriendActionCreator({ _id: authUserId }));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`Now You and ${username} are friends`
						)
					);
				}

				if (subscriberType === 'following') {
					authUserDispatch(
						addFollowingActionCreator({ _id: userId })
					);

					userDispatch(addFollowerActionCreator({ _id: authUserId }));

					noticeContextDispatch(
						addSuccessNoticesActionCreator(
							`You following ${username}`
						)
					);
				}
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	return (
		<Button className={className} onClick={followHandler}>
			Follow
		</Button>
	);
};

export default UserFollowButton;
