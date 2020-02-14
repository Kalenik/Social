import LikedPostInfo from '@components/LikedPosts/LikedPostInfo';
import ILikedPost from '@interfaces/ILikedPost';
import dateToNumber from '@utils/dateToNumber';
import React, { useState } from 'react';
import LikedPostItem from './LikedPostItem/LikedPostItem';

interface ILikedPostListProps {
	likedPosts: Array<ILikedPost>;
	setLikedPosts: React.Dispatch<React.SetStateAction<ILikedPost[]>>;
}

const LikedPostList: React.FC<ILikedPostListProps> = ({
	likedPosts,
	setLikedPosts
}) => {
	const [
		selectedLikedPost,
		setSelectedLikedPost
	] = useState<ILikedPost | null>(null);

	const sortedLikedPosts = likedPosts
		.concat()
		.sort((a, b) => dateToNumber(b.created!) - dateToNumber(a.created!));

	const deleteLikedPost = (likedPostId: string): void =>
		setLikedPosts(likedPosts =>
			likedPosts.filter(b => b._id !== likedPostId)
		);

	const closeLikedPostInfo = (): void => setSelectedLikedPost(null);

	const showLikedPostInfo = (likedPostId: string): void =>
		setSelectedLikedPost(
			likedPosts.find(b => b._id === likedPostId) || null
		);

	return (
		<>
			{selectedLikedPost && (
				<LikedPostInfo
					selectedLikedPost={selectedLikedPost}
					deleteLikedPost={deleteLikedPost}
					modalCancelHandler={closeLikedPostInfo}
				/>
			)}

			<ul className='liked-post-list'>
				{sortedLikedPosts.map(
					({ _id = '', post, created }: ILikedPost) => (
						<LikedPostItem
							key={_id}
							likedPostId={_id}
							likedPostCreated={created!}
							showLikedPostInfo={showLikedPostInfo}
							post={post!}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default LikedPostList;
