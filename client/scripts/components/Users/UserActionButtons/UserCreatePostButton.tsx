import PlusButton from '@components/Buttons/SvgButtons/PlusButton';
import PostCreator from '@components/Posts/PostCreator';
import IPost from '@interfaces/IPost';
import { addPostActionCreator } from '@reducers/UserReducer/UserActionCreators';
import { userReducerActionType } from '@reducers/UserReducer/UserReducer';
import React from 'react';

interface IUserCreatePostButtonProps {
	userDispatch: React.Dispatch<userReducerActionType>;
	className?: string;
}

const UserCreatePostButton: React.FC<IUserCreatePostButtonProps> = ({
	userDispatch,
	className
}) => {
	const createPostControl = (onClick: () => void): JSX.Element => (
		<PlusButton className={className} onClick={onClick} />
	);

	const addPost = (createdPost: IPost): void =>
		userDispatch(addPostActionCreator(createdPost));

	return (
		<PostCreator createPostControl={createPostControl} addPost={addPost} />
	);
};

export default UserCreatePostButton;
