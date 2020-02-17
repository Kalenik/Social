import MessageNoticeList from '@components/Messages/MessageNoticeList/MessageNoticeList';
import AuthContext from '@contexts/authContext';
import MessagesContext from '@contexts/messageContext';
import SocketContext from '@contexts/socketContext';
import IMessageNotice from '@interfaces/IMessageNotice';
import getUsernamesWithUnviewedMessages from '@services/MessageService/getUsernamesWithUnviewedMessages';
import setMessagesViewed from '@services/MessageService/setMessagesViewed';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface IMessageContextProvider {
	children?: React.ReactNode;
}

const MessageContextProvider: React.FC<IMessageContextProvider> = ({
	children
}) => {
	const { token } = useContext(AuthContext),
		{ socket } = useContext(SocketContext),
		[
			usernamesWithUnviewedMessages,
			setUsernamesWithUnviewedMessages
		] = useState<Array<string>>([]),
		[messageNoticeList, setMessageNoticeList] = useState<
			Array<IMessageNotice>
		>([]),
		{ pathname } = useLocation(),
		isUserMessagesPage = pathname.indexOf('/messages/') !== -1,
		chattingUsername = pathname.split('/').pop();

	const addMessageNotice = (newMessageNotice: IMessageNotice): void =>
		setMessageNoticeList(prevMessageNoticeList => [
			newMessageNotice,
			...prevMessageNoticeList
		]);

	const deleteFromUsernamesWithUnviewedMessages = (
		deletedUsername: string
	): void =>
		setUsernamesWithUnviewedMessages(usernames =>
			usernames.filter(username => username !== deletedUsername)
		);

	const addToUsernamesWithUnviewedMessages = (newUsername: string): void =>
		setUsernamesWithUnviewedMessages(usernames =>
			usernames.indexOf(newUsername) === -1
				? [...usernames, newUsername]
				: usernames
		);

	const messagesViewedHandler = (chattingUsername: string): void => {
		setMessagesViewed(token, chattingUsername)
			.then(() =>
				deleteFromUsernamesWithUnviewedMessages(chattingUsername)
			)
			.catch(err => console.log(err));
	};

	useEffect(() => {
		if (token) {
			getUsernamesWithUnviewedMessages(token)
				.then((usernames: Array<string>) => {
					setUsernamesWithUnviewedMessages(usernames);
				})
				.catch(err => console.log(err));
		}
	}, [token]);

	useEffect(() => {
		if (
			isUserMessagesPage &&
			chattingUsername &&
			usernamesWithUnviewedMessages.indexOf(chattingUsername) !== -1
		) {
			messagesViewedHandler(chattingUsername);
		}

		socket!.on('new_message_notice', (newMessageNotice: IMessageNotice) => {
			if (
				!(
					isUserMessagesPage &&
					newMessageNotice.senderName === chattingUsername
				)
			) {
				addMessageNotice(newMessageNotice);
				addToUsernamesWithUnviewedMessages(newMessageNotice.senderName);
			} else {
				messagesViewedHandler(chattingUsername);
			}
		});

		return () => {
			socket!.removeListener('new_message_notice');
		};
	}, [isUserMessagesPage, chattingUsername]);

	return (
		<MessagesContext.Provider
			value={{
				usernamesWithUnviewedMessages,
				setUsernamesWithUnviewedMessages
			}}
		>
			{children}
			<MessageNoticeList
				messageNoticeList={messageNoticeList}
				setMessageNoticeList={setMessageNoticeList}
			/>
		</MessagesContext.Provider>
	);
};

export default MessageContextProvider;
