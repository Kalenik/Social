import UserImage from '@components/Users/UserImage';
import getTimeOrDateString from '@utils/getTimeOrDateString';
import React from 'react';

interface ILastMessageItemProps {
	username: string;
	profileImgSrc?: string;
	messageText: string;
	unviewedCount: number;
	isYour: boolean;
	updated: string;
	goToUserMessages: (username: string) => void;
	isOnline: boolean;
	isTyping: boolean;
}

const LastMessageItem: React.FC<ILastMessageItemProps> = ({
	username,
	profileImgSrc,
	messageText,
	unviewedCount,
	isYour,
	updated,
	goToUserMessages,
	isOnline,
	isTyping
}) => {
	const showUserMessages = goToUserMessages.bind(null, username);

	return (
		<li
			className='last-message-item'
			onClick={showUserMessages}
			onKeyPress={showUserMessages}
			role='menuitem'
			tabIndex={0}
		>
			<div
				className={
					isOnline
						? 'last-message-item__user-image-wrapper last-message-item__user-image-wrapper_online'
						: 'last-message-item__user-image-wrapper'
				}
			>
				<UserImage
					src={profileImgSrc}
					className='user-image last-message-item__user-image'
					width={50}
					height={50}
				/>
			</div>

			<div className='last-message-item__username'>{username}</div>

			<div
				className={
					isTyping
						? 'last-message-item__message last-message-item__message_typing'
						: 'last-message-item__message'
				}
			>
				{isTyping ? 'typing...' : messageText}
			</div>

			<div className='last-message-item__date'>
				{getTimeOrDateString(updated)}
			</div>

			{unviewedCount ? (
				<div
					className={
						isYour
							? 'last-message-item__unviewed-count-badge last-message-item__unviewed-count-badge_your'
							: 'last-message-item__unviewed-count-badge'
					}
				>
					{unviewedCount}
				</div>
			) : null}
		</li>
	);
};

export default LastMessageItem;
