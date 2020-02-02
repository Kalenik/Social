import IPost from '@interfaces/IPost';
import IUser from '@interfaces/IUser';
import { userReducerActionType } from './UserReducer';

export const setUserActionCreator = (user: IUser): userReducerActionType => ({
	type: 'SetUser',
	user
});

export const addPostActionCreator = (
	createdPost: IPost
): userReducerActionType => ({
	type: 'AddPost',
	createdPost
});

export const editPostActionCreator = (
	updatedPost: IPost
): userReducerActionType => ({
	type: 'EditPost',
	updatedPost
});

export const deletePostActionCreator = (
	deletedPostId: string
): userReducerActionType => ({
	type: 'DeletePost',
	deletedPostId
});

export const addFriendActionCreator = (
	friend: IUser
): userReducerActionType => ({
	type: 'AddFriend',
	friend
});

export const deleteFriendActionCreator = (
	deletedFriendId: string
): userReducerActionType => ({
	type: 'DeleteFriend',
	deletedFriendId
});

export const addFollowingActionCreator = (
	following: IUser
): userReducerActionType => ({
	type: 'AddFollowing',
	following
});

export const deleteFollowingActionCreator = (
	deletedFollowingId: string
): userReducerActionType => ({
	type: 'DeleteFollowing',
	deletedFollowingId
});

export const addFollowerActionCreator = (
	follower: IUser
): userReducerActionType => ({
	type: 'AddFollower',
	follower
});

export const deleteFollowerActionCreator = (
	deletedFollowerId: string
): userReducerActionType => ({
	type: 'DeleteFollower',
	deletedFollowerId
});
