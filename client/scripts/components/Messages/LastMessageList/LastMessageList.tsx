import SocketContext from '@contexts/socketContext';
import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import IUserTypingData from '@interfaces/IUserTypingData';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import LastMessageItem from './LastMessageItem/LastMessageItem';

interface ILastMessageListProps {
	lastMessageListData: Array<ILastMessageItemData>;
}

const LastMessageList: React.FC<ILastMessageListProps> = ({
	lastMessageListData
}) => {
	const history = useHistory(),
		{ connectedUsernames } = useContext(SocketContext),
		{ socket } = useContext(SocketContext),
		[senderName, setSenderName] = useState(''),
		[isTyping, setTyping] = useState(false);

	const goToUserMessages = (username: string) =>
		history.push(`/messages/${username}`);

	useEffect(() => {
		socket!.on(
			'user-typing',
			({ isTyping, senderName }: IUserTypingData) => {
				setSenderName(senderName);
				setTyping(isTyping);
			}
		);

		return () => {
			socket!.removeListener('user-typing');
		};
	}, []);

	return (
		<ul className='last-message-list'>
			{lastMessageListData.map(
				({
					username,
					profileImgSrc,
					lastMessage: { messageText, updated },
					unviewedCount,
					isYour
				}) => (
					<LastMessageItem
						key={username}
						username={username}
						profileImgSrc={profileImgSrc}
						messageText={messageText}
						unviewedCount={unviewedCount}
						isYour={isYour}
						updated={updated}
						goToUserMessages={goToUserMessages}
						isOnline={connectedUsernames.indexOf(username!) !== -1}
						isTyping={isTyping && username === senderName}
					/>
				)
			)}
		</ul>
	);
};

export default LastMessageList;
