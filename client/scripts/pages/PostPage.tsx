import PostCreateControl from '@components/Posts/PostCreateControl';
import PostFilter from '@components/Posts/PostFilter';
import PostPagePosts from '@components/Posts/PostPagePosts';
import Spinner from '@components/Spinner';
import NoticeContext from '@contexts/noticeContext';
import IPost from '@interfaces/IPost';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import PostService from '@services/PostService';
import React, { useContext, useEffect, useState } from 'react';

const PostPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		[isLoading, setLoading] = useState(true),
		[posts, setPosts] = useState<Array<IPost>>([]),
		[filteredPosts, setFilteredPosts] = useState(posts);

	useEffect(() => {
		PostService.fetchPosts()
			.then((posts: Array<IPost>) => {
				setPosts(posts);
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='post-page'>
			<PostCreateControl setPosts={setPosts} />

			<PostFilter
				posts={posts}
				filteredPosts={filteredPosts}
				setFilteredPosts={setFilteredPosts}
			/>

			<PostPagePosts filteredPosts={filteredPosts} setPosts={setPosts} />

			{posts.length < 1 && (
				<div className='post-page__no-posts'>No Posts</div>
			)}
		</div>
	);
};

export default PostPage;
