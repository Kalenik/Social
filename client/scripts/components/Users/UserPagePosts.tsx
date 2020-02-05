import PostList from '@components/Posts/PostList/PostList';
import IPost from '@interfaces/IPost';
import {
	deletePostActionCreator,
	editPostActionCreator
} from '@reducers/UserReducer/UserActionCreators';
import { userReducerActionType } from '@reducers/UserReducer/UserReducer';
import React from 'react';

interface IUserPagePostsProps {
	posts: Array<IPost>;
	userDispatch: React.Dispatch<userReducerActionType>;
}

const UserPagePosts: React.FC<IUserPagePostsProps> = ({
	posts,
	userDispatch
}) => {
	const deletePost = (deletedPostId: string): void =>
		userDispatch(deletePostActionCreator(deletedPostId));

	const editPost = (updatedPost: IPost): void =>
		userDispatch(editPostActionCreator(updatedPost));

	return (
		<div className='user-page__posts'>
			<PostList
				posts={posts}
				deletePost={deletePost}
				editPost={editPost}
			/>

			{posts.length < 1 && (
				<div className='user-page__no-posts'>No Posts</div>
			)}
		</div>
	);
};

export default UserPagePosts;
