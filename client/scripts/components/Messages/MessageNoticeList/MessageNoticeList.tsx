import SocketContext from '@contexts/socketContext';
import IMessageNotice from '@interfaces/IMessageNotice';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import MessageNoticeItem from './MessageNoticeItem/MessageNoticeItem';

const MessageNoticeList: React.FC = () => {
	const history = useHistory(),
		{ socket } = useContext(SocketContext),
		[messageNoticeList, setMessageNoticeList] = useState<
			Array<IMessageNotice>
		>([]),
		{ pathname } = useLocation(),
		isUserMessagesPage = pathname.indexOf('/messages/') !== -1,
		chattingUsername = pathname.split('/').pop();

	const goToUserMessages = (username: string) =>
		history.push(`/messages/${username}`);

	const addMessageNotice = (newMessageNotice: IMessageNotice): void =>
		setMessageNoticeList(prevMessageNoticeList => [
			newMessageNotice,
			...prevMessageNoticeList
		]);

	const deleteMessageNotice = (messageId: string): void =>
		setMessageNoticeList(prevMessageNoticeList =>
			prevMessageNoticeList.filter(
				messageNotice => messageNotice.messageId !== messageId
			)
		);

	useEffect(() => {
		socket!.on('new_message_notice', (newMessageNotice: IMessageNotice) => {
			if (
				!(
					isUserMessagesPage &&
					newMessageNotice.senderName === chattingUsername
				)
			) {
				addMessageNotice(newMessageNotice);
			}
		});

		return () => {
			socket!.removeListener('new_message_notice');
		};
	}, [isUserMessagesPage, chattingUsername]);

	return (
		<ul className='message-notice-list'>
			{messageNoticeList.map(
				({
					messageId,
					messageText,
					senderName,
					senderProfileImgSrc
				}) => (
					<MessageNoticeItem
						key={messageId}
						messageId={messageId}
						messageText={messageText}
						senderName={senderName}
						senderProfileImgSrc={senderProfileImgSrc}
						goToUserMessages={goToUserMessages}
						deleteMessageNotice={deleteMessageNotice}
					/>
				)
			)}
		</ul>
	);
};

export default MessageNoticeList;
