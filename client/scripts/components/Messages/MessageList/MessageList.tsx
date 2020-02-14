import AuthContext from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import IMessage from '@interfaces/IMessage';
import IMessageItemData from '@interfaces/IMessageItemData';
import IUserTypingData from '@interfaces/IUserTypingData';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import deleteMessage from '@services/MessageService/deleteMessage';
import editMessage from '@services/MessageService/editMessage';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MessageItem from './MessageItem/MessageItem';

interface IMessageListProps {
	messageListData: Array<IMessageItemData>;
	receiverName: string;
	updateMessageInListData: (updatedMessage: IMessage) => void;
	deleteMessageFromListData: (messageId: string) => void;
}

const MessageList: React.FC<IMessageListProps> = ({
	messageListData,
	receiverName,
	updateMessageInListData,
	deleteMessageFromListData
}) => {
	const history = useHistory(),
		{ token, authUser } = useContext(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		{ socket } = useContext(SocketContext),
		[isTyping, setTyping] = useState(false),
		[messageIdInUpdateMode, setMessageIdInUpdateMode] = useState('');

	const goToUserPage = (username: string) =>
		history.push(`/user/${username}`);

	const activateUpdateMode = (messageId: string): void =>
		setMessageIdInUpdateMode(messageId);

	const deactivateUpdateMode = (): void => setMessageIdInUpdateMode('');

	const onUpdateMessage = (newMessageText: string) => {
		setLoading(true);

		editMessage(token, receiverName, messageIdInUpdateMode, newMessageText)
			.then((updatedMessage: IMessage) =>
				updateMessageInListData(updatedMessage)
			)
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				deactivateUpdateMode();
				setLoading(false);
			});
	};

	const onDeleteMessage = (messageId: string) => {
		setLoading(true);

		deleteMessage(token, receiverName, messageId)
			.then(() => deleteMessageFromListData(messageId))
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));
	};

	useEffect(() => {
		socket!.on(
			'user-typing',
			({ isTyping, senderName }: IUserTypingData) => {
				if (senderName === receiverName) {
					setTyping(isTyping);
				}
			}
		);

		return () => {
			socket!.removeListener('user-typing');
		};
	}, []);

	return (
		<ul className='message-list'>
			{messageListData.map(
				({
					username,
					profileImgSrc,
					message: { _id, messageText, created, updated }
				}) => (
					<MessageItem
						key={_id}
						messageId={_id}
						messageText={messageText}
						created={created}
						updated={updated}
						username={username}
						profileImgSrc={profileImgSrc}
						isYouMessageItem={username === authUser.username}
						goToUserPage={goToUserPage}
						onDeleteMessage={onDeleteMessage}
						isUpdateMode={messageIdInUpdateMode === _id}
						deactivateUpdateMode={deactivateUpdateMode}
						activateUpdateMode={activateUpdateMode}
						onUpdateMessage={onUpdateMessage}
					/>
				)
			)}

			<li
				className={
					isTyping
						? 'message-list__typing message-list__typing_on'
						: 'message-list__typing'
				}
			>
				{receiverName} typing...
			</li>
		</ul>
	);
};

export default MessageList;
