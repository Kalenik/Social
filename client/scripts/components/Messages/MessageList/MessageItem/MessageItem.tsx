import EditMessageForm from '@components/Forms/EditMessageForm';
import EditPencilSvg from '@components/SVG/EditPencilSvg';
import TrashCanSvg from '@components/SVG/TrashCanSvg';
import UserImage from '@components/Users/UserImage';
import { dateToNumber, getTimeOrDateString } from '@helpers/Utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface IMessageItemProps {
	messageId: string;
	messageText: string;
	created: string;
	updated: string;
	username: string;
	profileImgSrc?: string;
	isYouMessageItem: boolean;
	goToUserPage: (username: string) => void;
	onDeleteMessage: (messageId: string) => void;
	isUpdateMode: boolean;
	activateUpdateMode: (messageId: string) => void;
	deactivateUpdateMode: () => void;
	onUpdateMessage: (newMessageText: string) => void;
}

const MessageItem: React.FC<IMessageItemProps> = ({
	messageId,
	messageText,
	created,
	updated,
	username,
	profileImgSrc,
	isYouMessageItem,
	goToUserPage,
	onDeleteMessage,
	isUpdateMode,
	activateUpdateMode,
	deactivateUpdateMode,
	onUpdateMessage
}) => {
	const createdDate = getTimeOrDateString(created),
		isUpdated = dateToNumber(updated) > dateToNumber(created);

	return (
		<li className='message-item'>
			<div
				className='message-item__image'
				onClick={goToUserPage.bind(null, username)}
				onKeyPress={goToUserPage.bind(null, username)}
				role='button'
				tabIndex={0}
			>
				<UserImage
					src={profileImgSrc}
					className='message-item__user-image'
					width={30}
					height={30}
				/>
			</div>

			<div className='message-item__username'>
				<Link
					className='message-item__username-link'
					to={`/user/${username}`}
				>
					{username}
				</Link>
			</div>

			<div className='message-item__date'>
				{isUpdated ? (
					<>
						<p>Updated:</p>
						<p>{getTimeOrDateString(updated)}</p>
					</>
				) : (
					<p>{createdDate}</p>
				)}
			</div>

			{isYouMessageItem && isUpdateMode ? (
				<EditMessageForm
					messageText={messageText}
					onUpdateMessage={onUpdateMessage}
					deactivateUpdateMode={deactivateUpdateMode}
				/>
			) : (
				<div className='message-item__message'>{messageText}</div>
			)}

			{isYouMessageItem && !isUpdateMode && (
				<div className='message-item__actions'>
					<EditPencilSvg
						className='message-item__edit-pencil'
						onClick={activateUpdateMode.bind(null, messageId)}
						onKeyPress={activateUpdateMode.bind(null, messageId)}
						role='button'
						tabIndex={0}
					/>
					<TrashCanSvg
						className='message-item__trash-can'
						onClick={onDeleteMessage.bind(null, messageId)}
						onKeyPress={onDeleteMessage.bind(null, messageId)}
						role='button'
						tabIndex={0}
					/>
				</div>
			)}
		</li>
	);
};

export default MessageItem;