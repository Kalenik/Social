import ItemFilter from '@components/ItemFilter';
import IPost from '@interfaces/IPost';
import React, { useEffect, useState } from 'react';

interface IPostFilterProps {
	posts: Array<IPost>;
	filteredPosts: Array<IPost>;
	setFilteredPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostFilter: React.FC<IPostFilterProps> = ({
	posts,
	filteredPosts,
	setFilteredPosts
}) => {
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setFilteredPosts(
			posts.filter(
				({ title, text }) =>
					title?.toLowerCase().indexOf(filterValue.toLowerCase()) !==
						-1 || text?.indexOf(filterValue.toLowerCase()) !== -1
			)
		);
	}, [filterValue, posts]);

	return posts.length > 0 ? (
		<>
			<ItemFilter
				setFilterValue={setFilterValue}
				className='post-filter'
			/>

			{filteredPosts.length < 1 && (
				<div className='post-filter__no-posts'>No Posts Found</div>
			)}
		</>
	) : null;
};

export default PostFilter;
