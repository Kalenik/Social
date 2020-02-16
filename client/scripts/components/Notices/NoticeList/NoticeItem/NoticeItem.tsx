import XMarkIconButton from '@components/Buttons/SvgIconButtons/XMarkIconButton';
import AppNotice from '@contexts/contextProviders/NoticeContextProvider/AppNotice';
import NoticeContext from '@contexts/noticeContext';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface INoticeItemProps {
	notice: AppNotice;
}

const NoticeItem: React.FC<INoticeItemProps> = ({ notice }) => {
	const noticeContextDispatch = useContext(NoticeContext),
		[isClosed, setClosed] = useState(false),
		[isHovered, setHovered] = useState(false),
		[isFocused, setFocused] = useState(false),
		noticeTimerId = useRef(0);

	const onMouseEnterHandler = () => setHovered(true),
		onMouseLeaveHandler = () => setHovered(false),
		onFocusHandler = () => setFocused(true),
		onBlurHandler = () => setFocused(false);

	const closeNotice = (): void => setClosed(true);

	const clearCloseNoticeTimeout = (): void =>
		clearTimeout(noticeTimerId.current);

	const setCloseNoticeTimeout = (): void => {
		noticeTimerId.current = window.setTimeout(closeNotice, 5000);
	};

	const animationEndHandler = (
		e: React.AnimationEvent<HTMLLIElement>
	): void => {
		e.animationName === 'fade-out-notice' &&
			noticeContextDispatch({
				type: 'DeleteNotice',
				noticeForDelete: notice
			});
	};

	useEffect(() => {
		if (isHovered || isFocused) {
			clearCloseNoticeTimeout();
		}

		if (!isHovered && !isFocused) {
			setCloseNoticeTimeout();
		}
	}, [isHovered, isFocused]);

	useEffect(() => {
		return () => clearCloseNoticeTimeout();
	}, []);

	return (
		<li
			className={
				isClosed
					? `notice-item notice-item_${notice.type} notice-item_closed`
					: `notice-item notice-item_${notice.type} notice-item_shown`
			}
			onAnimationEnd={animationEndHandler}
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
			onFocus={onFocusHandler}
			onBlur={onBlurHandler}
			role='menuitem'
			tabIndex={0}
		>
			{notice.message}
			<XMarkIconButton
				className='notice-item__button'
				onClick={closeNotice}
				onKeyPress={closeNotice}
			/>
		</li>
	);
};

export default NoticeItem;
