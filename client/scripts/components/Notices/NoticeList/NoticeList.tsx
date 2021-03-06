import AppNotice from '@contexts/contextProviders/NoticeContextProvider/AppNotice';
import React from 'react';
import NoticeItem from './NoticeItem/NoticeItem';

interface INoticeList {
	notices: AppNotice[];
}

const NoticeList: React.FC<INoticeList> = ({ notices }) => (
	<ul className='notice-list'>
		{[...notices].reverse().map(notice => (
			<NoticeItem
				key={`${notice.type}_${notice.message}`}
				notice={notice}
			/>
		))}
	</ul>
);

export default NoticeList;
