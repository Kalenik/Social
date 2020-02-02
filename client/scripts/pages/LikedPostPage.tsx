import LikedPostList from '@components/LikedPosts/LikedPostList/LikedPostList';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import ILikedPost from '@interfaces/ILikedPost';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import LikedPostService from '@services/LikedPostService';
import React, { useContext, useEffect, useState } from 'react';

const LikedPostPage: React.FC = () => {
	const { token } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[likedPosts, setLikedPosts] = useState<Array<ILikedPost>>([]);

	useEffect(() => {
		setLoading(true);

		LikedPostService.fetchLikedPosts(token)
			.then((likedPosts: Array<ILikedPost>) => setLikedPosts(likedPosts))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	}, [token]);

	return (
		<LikedPostList likedPosts={likedPosts} setLikedPosts={setLikedPosts} />
	);
};

export default LikedPostPage;
