import PostCreateControl from '@components/Posts/PostCreateControl';
import PostPagePosts from '@components/Posts/PostPagePosts';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import IPost from '@interfaces/IPost';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import PostService from '@services/PostService';
import React, { useContext, useEffect, useState } from 'react';

const PostPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[posts, setPosts] = useState<Array<IPost>>([]);

	useEffect(() => {
		setLoading(true);

		PostService.fetchPosts()
			.then((posts: Array<IPost>) => {
				setPosts(posts);
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, []);

	return (
		<div className='post-page'>
			<PostCreateControl setPosts={setPosts} />
			<PostPagePosts posts={posts} setPosts={setPosts} />
		</div>
	);
};

export default PostPage;
