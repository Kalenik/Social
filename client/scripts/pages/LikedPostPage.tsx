import LikedPostList from '@components/LikedPosts/LikedPostList/LikedPostList';
import Spinner from '@components/Spinner';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import ILikedPost from '@interfaces/ILikedPost';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import LikedPostService from '@services/LikedPostService';
import React, { useContext, useEffect, useState } from 'react';

const LikedPostPage: React.FC = () => {
	const { token } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		[isLoading, setLoading] = useState(true),
		[likedPosts, setLikedPosts] = useState<Array<ILikedPost>>([]);

	useEffect(() => {
		LikedPostService.fetchLikedPosts(token)
			.then((likedPosts: Array<ILikedPost>) => setLikedPosts(likedPosts))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, [token]);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='liked-post-page'>
			<LikedPostList
				likedPosts={likedPosts}
				setLikedPosts={setLikedPosts}
			/>

			{likedPosts.length < 1 && (
				<div className='liked-post-page__no-posts'>No Liked Posts</div>
			)}
		</div>
	);
};

export default LikedPostPage;
