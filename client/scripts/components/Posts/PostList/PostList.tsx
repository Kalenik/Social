import PostEditor from '@components/Posts/PostEditor';
import PostInfo from '@components/Posts/PostInfo';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import IPost from '@interfaces/IPost';
import React, { useContext, useState } from 'react';
import PostItem from './PostItem/PostItem';

interface IPostListProps {
	posts: Array<IPost>;
	isBadgeShow?: boolean;
	editPost: (updatedPost: IPost) => void;
	deletePost: (deletedPostId: string) => void;
}

const PostList: React.FC<IPostListProps> = ({
	posts,
	isBadgeShow,
	editPost,
	deletePost
}) => {
	const {
			authUser: { _id: authUserId }
		} = useContext<IAuthContext>(AuthContext),
		[selectedPost, setSelectedPost] = useState<IPost | null>(null),
		[isPostInfoShow, setPostInfoShow] = useState(false),
		[isPostEditorShow, setPostEditorShow] = useState(false);

	const closePostInfo = (): void => {
		setSelectedPost(null);
		setPostInfoShow(false);
	};

	const showPostInfo = (postId: string): void => {
		setSelectedPost(posts.find(e => e._id === postId) || null);
		setPostInfoShow(true);
	};

	const closePostEditor = (): void => {
		setSelectedPost(null);
		setPostEditorShow(false);
	};

	const showPostEditor = (postId: string): void => {
		setSelectedPost(posts.find(e => e._id === postId) || null);
		setPostEditorShow(true);
	};

	return (
		<>
			{selectedPost && (
				<>
					{isPostInfoShow && (
						<PostInfo
							postId={selectedPost._id || ''}
							postTitle={selectedPost.title || ''}
							postText={selectedPost.text || ''}
							postCreated={selectedPost.created!}
							postUpdated={selectedPost.updated!}
							isYourPost={
								authUserId === selectedPost.creator?._id
							}
							deletePost={deletePost}
							modalCancelHandler={closePostInfo}
						/>
					)}
					{isPostEditorShow && (
						<PostEditor
							postId={selectedPost._id || ''}
							postTitle={selectedPost.title || ''}
							postText={selectedPost.text || ''}
							editPost={editPost}
							modalCancelHandler={closePostEditor}
						/>
					)}
				</>
			)}
			<ul className='post-list'>
				{posts.map(
					({
						_id = '',
						title = '',
						created,
						updated,
						creator
					}: IPost) => (
						<PostItem
							key={_id}
							postId={_id}
							title={title}
							created={created!}
							updated={updated!}
							creatorName={creator?.username || ''}
							showPostInfo={showPostInfo}
							showPostEditor={showPostEditor}
							isYourPost={authUserId === creator?._id}
							isBadgeShow={isBadgeShow}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default PostList;
