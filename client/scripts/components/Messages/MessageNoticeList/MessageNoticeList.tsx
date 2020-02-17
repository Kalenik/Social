import IMessageNotice from '@interfaces/IMessageNotice';
import React from 'react';
import { useHistory } from 'react-router';
import MessageNoticeItem from './MessageNoticeItem/MessageNoticeItem';

interface IMessageNoticeList {
	messageNoticeList: Array<IMessageNotice>;
	setMessageNoticeList: React.Dispatch<
		React.SetStateAction<IMessageNotice[]>
	>;
}

const MessageNoticeList: React.FC<IMessageNoticeList> = ({
	messageNoticeList,
	setMessageNoticeList
}) => {
	const history = useHistory(),
		goToUserMessages = (username: string): void =>
			history.push(`/messages/${username}`);

	const deleteMessageNotice = (messageId: string): void =>
		setMessageNoticeList(prevMessageNoticeList =>
			prevMessageNoticeList.filter(
				messageNotice => messageNotice.messageId !== messageId
			)
		);

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
