import MessageNoticeList from '@components/Messages/MessageNoticeList/MessageNoticeList';
import AuthContext from '@contexts/authContext';
import MessagesContext from '@contexts/messageContext';
import SocketContext from '@contexts/socketContext';
import IMessageNotice from '@interfaces/IMessageNotice';
import IUsernamesWithUnviewedMessagesCount from '@interfaces/IUsernamesWithUnviewedMessagesCount';
import setMessagesViewed from '@services/MessageService/setMessagesViewed';
import getUsernamesWithUnviewedMessagesCount from '@services/MessageService/usernamesWithUnviewedMessagesCount';
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
			usernamesWithUnviewedMessagesCount,
			setUsernamesWithUnviewedMessagesCount
		] = useState<Array<IUsernamesWithUnviewedMessagesCount>>([]),
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
		setUsernamesWithUnviewedMessagesCount(
			prevUsernamesWithUnviewedMessagesCount =>
				prevUsernamesWithUnviewedMessagesCount.filter(
					({ username }) => username !== deletedUsername
				)
		);

	const addToUsernamesWithUnviewedMessages = (newUsername: string): void =>
		setUsernamesWithUnviewedMessagesCount(
			prevUsernamesWithUnviewedMessagesCount =>
				prevUsernamesWithUnviewedMessagesCount.find(
					({ username }) => username === newUsername
				)
					? prevUsernamesWithUnviewedMessagesCount.map(
							({ username, unviewedCount }) =>
								username === newUsername
									? {
											username,
											unviewedCount: unviewedCount + 1
									  }
									: { username, unviewedCount }
					  )
					: [
							...prevUsernamesWithUnviewedMessagesCount,
							{ username: newUsername, unviewedCount: 1 }
					  ]
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
			getUsernamesWithUnviewedMessagesCount(token)
				.then(
					(
						usernamesWithUnviewedMessagesCount: Array<
							IUsernamesWithUnviewedMessagesCount
						>
					) => {
						setUsernamesWithUnviewedMessagesCount(
							usernamesWithUnviewedMessagesCount
						);
					}
				)
				.catch(err => console.log(err));
		}
	}, [token]);

	useEffect(() => {
		if (
			isUserMessagesPage &&
			chattingUsername &&
			usernamesWithUnviewedMessagesCount.find(
				({ username }) => username === chattingUsername
			)
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

	useEffect(() => {
		socket!.on('username_deleted_unviewed_message', (senderName: string) =>
			setUsernamesWithUnviewedMessagesCount(
				prevUsernamesWithUnviewedMessagesCount => {
					const usernameWithUnviewedMessagesCount = prevUsernamesWithUnviewedMessagesCount.find(
						({ username }) => username === senderName
					);

					return usernameWithUnviewedMessagesCount
						? usernameWithUnviewedMessagesCount.unviewedCount === 1
							? prevUsernamesWithUnviewedMessagesCount.filter(
									({ username }) => username !== senderName
							  )
							: prevUsernamesWithUnviewedMessagesCount.map(
									({ username, unviewedCount }) =>
										username === senderName
											? {
													username,
													unviewedCount:
														unviewedCount - 1
											  }
											: { username, unviewedCount }
							  )
						: prevUsernamesWithUnviewedMessagesCount;
				}
			)
		);

		return () => {
			socket!.removeListener('username_deleted_unviewed_message');
		};
	}, []);

	return (
		<MessagesContext.Provider
			value={{
				usernamesWithUnviewedMessagesCount,
				setUsernamesWithUnviewedMessagesCount
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
