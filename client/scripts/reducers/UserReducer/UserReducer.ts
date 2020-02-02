import IPost from '@interfaces/IPost';
import IUser from '@interfaces/IUser';

const addElToArr = (arr: Array<IPost | IUser>, newEl: IPost | IUser) => [
	...arr,
	newEl
];
const deleteElFromArr = (arr: Array<IPost | IUser>, delElemId: string) =>
	arr.filter(e => e._id !== delElemId);

export const initialUser = {
	_id: '',
	username: '',
	email: '',
	city: '',
	extraInfo: '',
	profileImgSrc: '',
	friends: [],
	following: [],
	followers: [],
	createdPosts: []
};

export type userReducerActionType =
	| { type: 'SetUser'; user: IUser }
	| { type: 'AddPost'; createdPost: IPost }
	| { type: 'EditPost'; updatedPost: IPost }
	| { type: 'DeletePost'; deletedPostId: string }
	| { type: 'AddFriend'; friend: IUser }
	| { type: 'DeleteFriend'; deletedFriendId: string }
	| { type: 'AddFollowing'; following: IUser }
	| { type: 'DeleteFollowing'; deletedFollowingId: string }
	| { type: 'AddFollower'; follower: IUser }
	| { type: 'DeleteFollower'; deletedFollowerId: string };

export type userReducerStateType = {
	_id: string;
	username: string;
	email: string;
	city: string;
	extraInfo: string;
	profileImgSrc: string;
	friends: Array<IUser>;
	following: Array<IUser>;
	followers: Array<IUser>;
	createdPosts: Array<IPost>;
};

const userReducer = (
	state: userReducerStateType,
	action: userReducerActionType
) => {
	switch (action.type) {
		case 'SetUser':
			return { ...state, ...action.user };
		case 'AddPost':
			return {
				...state,
				createdPosts: addElToArr(state.createdPosts, action.createdPost)
			};
		case 'EditPost':
			return {
				...state,
				createdPosts: state.createdPosts.map(e =>
					e._id !== action.updatedPost._id ? e : action.updatedPost
				)
			};
		case 'DeletePost':
			return {
				...state,
				createdPosts: deleteElFromArr(
					state.createdPosts,
					action.deletedPostId
				)
			};
		case 'AddFriend':
			return {
				...state,
				friends: addElToArr(state.friends, action.friend)
			};
		case 'DeleteFriend':
			return {
				...state,
				friends: deleteElFromArr(state.friends, action.deletedFriendId)
			};
		case 'AddFollowing':
			return {
				...state,
				following: addElToArr(state.following, action.following)
			};
		case 'DeleteFollowing':
			return {
				...state,
				following: deleteElFromArr(
					state.following,
					action.deletedFollowingId
				)
			};
		case 'AddFollower':
			return {
				...state,
				followers: addElToArr(state.followers, action.follower)
			};
		case 'DeleteFollower':
			return {
				...state,
				followers: deleteElFromArr(
					state.followers,
					action.deletedFollowerId
				)
			};
		default:
			return state;
	}
};

export default userReducer;
