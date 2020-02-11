import Button from '@components/Buttons/Button';
import IPost from '@interfaces/IPost';
import React from 'react';
import PostCreator from './PostCreator';

interface IPostCreateControlProps {
	setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostCreateControl: React.FC<IPostCreateControlProps> = ({ setPosts }) => {
	const createPostControl = (onClick: () => void): JSX.Element => (
		<div className='post-create-control'>
			<p className='post-create-control__title'>Share your own Posts!</p>
			<Button
				className='btn post-create-control__button'
				onClick={onClick}
			>
				Create Post
			</Button>
		</div>
	);

	const addPost = (createdPost: IPost): void =>
		setPosts(posts => [...posts, createdPost]);

	return (
		<PostCreator createPostControl={createPostControl} addPost={addPost} />
	);
};

export default PostCreateControl;
