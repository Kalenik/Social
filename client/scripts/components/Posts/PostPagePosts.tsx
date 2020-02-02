import PostList from '@components/Posts/PostList/PostList';
import IPost from '@interfaces/IPost';
import React from 'react';

interface IPostPagePostsProps {
	posts: Array<IPost>;
	setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostPagePosts: React.FC<IPostPagePostsProps> = ({ posts, setPosts }) => {
	const deletePost = (deletedPostId: string): void =>
		setPosts(posts => posts.filter(e => e._id !== deletedPostId));

	const editPost = (updatedPost: IPost): void =>
		setPosts(posts =>
			posts.map(e => (e._id !== updatedPost._id ? e : updatedPost))
		);

	return (
		<div className='post-page__posts'>
			<PostList
				posts={posts}
				deletePost={deletePost}
				editPost={editPost}
				isBadgeShow
			/>
		</div>
	);
};

export default PostPagePosts;
