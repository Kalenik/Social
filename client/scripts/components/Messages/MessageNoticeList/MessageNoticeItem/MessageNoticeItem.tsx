import XMarkIconButton from '@components/Buttons/SvgIconButtons/XMarkIconButton';
import UserImage from '@components/Users/UserImage';
import React, { useEffect, useRef, useState } from 'react';

interface IMessageNoticeItem {
	messageId: string;
	messageText: string;
	senderName: string;
	senderProfileImgSrc?: string;
	goToUserMessages: (senderName: string) => void;
	deleteMessageNotice: (messageId: string) => void;
}

const MessageNoticeItem: React.FC<IMessageNoticeItem> = ({
	messageId,
	messageText,
	senderName,
	senderProfileImgSrc,
	goToUserMessages,
	deleteMessageNotice
}) => {
	const [isClosed, setClosed] = useState(false),
		[isHovered, setHovered] = useState(false),
		[isFocused, setFocused] = useState(false),
		messageNoticeTimerId = useRef(0);

	const onMouseEnterHandler = () => setHovered(true),
		onMouseLeaveHandler = () => setHovered(false),
		onFocusHandler = () => setFocused(true),
		onBlurHandler = () => setFocused(false);

	const closeMessageNotice = (): void => setClosed(true);

	const clearCloseMessageNoticeTimeout = (): void =>
		clearTimeout(messageNoticeTimerId.current);

	const setCloseMessageNoticeTimeout = (): void => {
		messageNoticeTimerId.current = window.setTimeout(
			closeMessageNotice,
			10000
		);
	};

	const animationEndHandler = (
		e: React.AnimationEvent<HTMLLIElement>
	): void => {
		e.animationName === 'fade-out-message-notice' &&
			deleteMessageNotice(messageId);
	};

	const goToUserMessagesAndClose = (
		e:
			| React.MouseEvent<HTMLLIElement, MouseEvent>
			| React.KeyboardEvent<HTMLLIElement>
	) => {
		e.target instanceof SVGElement || goToUserMessages(senderName);
		closeMessageNotice();
	};

	useEffect(() => {
		if (isHovered || isFocused) {
			clearCloseMessageNoticeTimeout();
		}

		if (!isHovered && !isFocused) {
			setCloseMessageNoticeTimeout();
		}
	}, [isHovered, isFocused]);

	useEffect(() => {
		return () => clearCloseMessageNoticeTimeout();
	}, []);

	return (
		<li
			className={
				isClosed
					? `message-notice-item message-notice-item_closed`
					: `message-notice-item message-notice-item_shown`
			}
			onAnimationEnd={animationEndHandler}
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
			onFocus={onFocusHandler}
			onBlur={onBlurHandler}
			onClick={goToUserMessagesAndClose}
			onKeyPress={goToUserMessagesAndClose}
			role='menuitem'
			tabIndex={0}
		>
			<div className='message-notice-item__user-image-wrapper'>
				<UserImage
					src={senderProfileImgSrc}
					className='user-image message-notice-item__user-image'
					width={40}
					height={40}
				/>
			</div>

			<div className='message-notice-item__sender-name'>{senderName}</div>

			<div className='message-notice-item__message'>{messageText}</div>

			<XMarkIconButton
				className='message-notice-item__x-mark'
				onClick={closeMessageNotice}
				onKeyPress={closeMessageNotice}
			/>
		</li>
	);
};

export default MessageNoticeItem;
