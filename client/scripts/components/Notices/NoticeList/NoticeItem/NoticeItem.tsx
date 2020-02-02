import CloseButton from '@components/CloseButton';
import AppNotice from '@contexts/contextProviders/NoticeContextProvider/AppNotice';
import NoticeContext from '@contexts/noticeContext';
import React, { useContext, useEffect, useState } from 'react';

interface INoticeItemProps {
	notice: AppNotice;
}

const NoticeItem: React.FC<INoticeItemProps> = ({ notice }) => {
	const noticeContextDispatch = useContext(NoticeContext),
		[isRemoved, setRemoved] = useState(false),
		deleteNoticeActionCreatorItem = (): void => setRemoved(true);

	useEffect(() => {
		const noticeTimerId: number = window.setTimeout(
			deleteNoticeActionCreatorItem,
			5000
		);

		return () => clearTimeout(noticeTimerId);
	}, []);

	return (
		<div
			className={
				isRemoved
					? `notice-item notice-item_${notice.type} notice-item_removed`
					: `notice-item notice-item_${notice.type} notice-item_hover`
			}
			onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) => {
				e.animationName === 'fade-out-notice' &&
					noticeContextDispatch({
						type: 'DeleteNotice',
						noticeForDelete: notice
					});
			}}
		>
			{notice.message}
			<CloseButton click={deleteNoticeActionCreatorItem} />
		</div>
	);
};

export default NoticeItem;
