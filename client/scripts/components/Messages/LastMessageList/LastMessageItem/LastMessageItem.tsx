import UserImage from '@components/Users/UserImage';
import { processDate } from '@helpers/Utils';
import React from 'react';

interface ILastMessageItemProps {
	username: string;
	profileImgSrc?: string;
	messageText: string;
	updated: string;
	goToUserMessages: (username: string) => void;
	isOnline: boolean;
	isTyping: boolean;
}

const LastMessageItem: React.FC<ILastMessageItemProps> = ({
	username,
	profileImgSrc,
	messageText,
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
						? 'last-message-item__image last-message-item__image_online'
						: 'last-message-item__image'
				}
			>
				<UserImage src={profileImgSrc} width={40} height={40} />
			</div>

			<p className='last-message-item__username'>{username}</p>

			<p
				className={
					isTyping
						? 'last-message-item__message last-message-item__message_typing'
						: 'last-message-item__message'
				}
			>
				{isTyping ? 'typing...' : messageText}
			</p>

			<p className='last-message-item__date'>{processDate(updated)}</p>
		</li>
	);
};

export default LastMessageItem;
