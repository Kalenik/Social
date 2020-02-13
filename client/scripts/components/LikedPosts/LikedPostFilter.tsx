import ItemFilter from '@components/ItemFilter';
import ILikedPost from '@interfaces/ILikedPost';
import React, { useEffect, useState } from 'react';

interface ILikedPostFilterProps {
	likedPosts: Array<ILikedPost>;
	filteredLikedPosts: Array<ILikedPost>;
	setFilteredLikedPosts: React.Dispatch<React.SetStateAction<ILikedPost[]>>;
}

const LikedPostFilter: React.FC<ILikedPostFilterProps> = ({
	likedPosts,
	filteredLikedPosts,
	setFilteredLikedPosts
}) => {
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setFilteredLikedPosts(
			likedPosts.filter(
				({ post }) =>
					post?.title
						?.toLowerCase()
						.indexOf(filterValue.toLowerCase()) !== -1
			)
		);
	}, [filterValue, likedPosts]);

	return likedPosts.length > 0 ? (
		<>
			<ItemFilter
				setFilterValue={setFilterValue}
				className='liked-post-filter'
			/>

			{filteredLikedPosts.length < 1 && (
				<div className='liked-post-filter__no-liked-posts'>
					No Liked Posts Found
				</div>
			)}
		</>
	) : null;
};

export default LikedPostFilter;
