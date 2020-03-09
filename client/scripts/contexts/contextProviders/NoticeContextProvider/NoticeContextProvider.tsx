import NoticeList from '@components/Notices/NoticeList/NoticeList';
import NoticeContext from '@contexts/noticeContext';
import noticesReducer from '@reducers/NoticesReducer/NoticesReducer';
import React, { useReducer } from 'react';

interface INoticeContextProvider {
	children: React.ReactNode;
}

const NoticeContextProvider: React.FC<INoticeContextProvider> = ({
	children
}) => {
	const [notices, noticeContextDispatch] = useReducer(noticesReducer, []);

	return (
		<NoticeContext.Provider value={noticeContextDispatch}>
			{children}
			<NoticeList notices={notices} />
		</NoticeContext.Provider>
	);
};

export default NoticeContextProvider;
