import SendMessageForm from '@components/Forms/SendMessageForm';
import MessageList from '@components/Messages/MessageList/MessageList';
import NoMessages from '@components/Messages/NoMessages';
import Spinner from '@components/Spinner';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import IDeletedMessageData from '@interfaces/IDeletedMessageData';
import IMessage from '@interfaces/IMessage';
import IMessageItemData from '@interfaces/IMessageItemData';
import IUser from '@interfaces/IUser';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import fetchMessagesData from '@services/MessageService/fetchMessagesData';
import dateToNumber from '@utils/dateToNumber';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface IFetchUserMessagesResponce {
	messagesFromYou: Array<IMessage>;
	messagesToYou: Array<IMessage>;
	receiverUser: IUser;
}

interface IRouteParams {
	username: string;
}

const MessagesPage: React.FC = () => {
	const { username } = useParams<IRouteParams>(),
		noticeContextDispatch = useContext(NoticeContext),
		{ socket } = useContext(SocketContext),
		{ token, authUser } = useContext(AuthContext),
		[isLoading, setLoading] = useState(true),
		[messageListData, setMessageListData] = useState<
			Array<IMessageItemData>
		>([]),
		[isError, setError] = useState(false);

	const addMessageToListData = (newMessageItemData: IMessageItemData): void =>
		setMessageListData(prevMessageListData => [
			...prevMessageListData,
			newMessageItemData
		]);

	const updateMessageInListData = (updatedMessage: IMessage): void =>
		setMessageListData(prevMessageListData =>
			prevMessageListData.map(messageItemData =>
				messageItemData.message._id !== updatedMessage._id
					? messageItemData
					: { ...messageItemData, message: updatedMessage }
			)
		);

	const deleteMessageFromListData = (messageId: string): void =>
		setMessageListData(prevMessageListData =>
			prevMessageListData.filter(
				messageItemData => messageItemData.message._id !== messageId
			)
		);

	useEffect(() => {
		fetchMessagesData(token, username)
			.then(
				({
					messagesFromYou,
					messagesToYou,
					receiverUser
				}: IFetchUserMessagesResponce) => {
					const messageItemDataFromYou: Array<IMessageItemData> = messagesFromYou.map(
						messageFromYou => ({
							username: authUser.username,
							profileImgSrc: authUser.profileImgSrc,
							message: messageFromYou
						})
					);

					const messageItemDataToYou: Array<IMessageItemData> = messagesToYou.map(
						messageToYou => ({
							username: receiverUser.username!,
							profileImgSrc: receiverUser.profileImgSrc,
							message: messageToYou
						})
					);

					setMessageListData(() =>
						[
							...messageItemDataFromYou,
							...messageItemDataToYou
						].sort(
							(a, b) =>
								dateToNumber(a.message.created) -
								dateToNumber(b.message.created)
						)
					);
				}
			)
			.catch(err => {
				setError(true);
				noticeContextDispatch(addErrorNoticesActionCreator(err));
			})
			.then(() => setLoading(false));
	}, []);

	useEffect(() => {
		socket!.on(
			'new_message_item_data',
			(newMessageItemData: IMessageItemData) => {
				if (newMessageItemData.username === username) {
					addMessageToListData(newMessageItemData);
				}
			}
		);

		socket!.on(
			'deleted_message_data',
			({ senderName, deletedMessageId }: IDeletedMessageData) => {
				if (senderName === username) {
					deleteMessageFromListData(deletedMessageId);
				}
			}
		);

		socket!.on(
			'updated_message_item_data',
			(upatedMessageItemData: IMessageItemData) => {
				if (upatedMessageItemData.username === username) {
					updateMessageInListData(upatedMessageItemData.message);
				}
			}
		);

		return () => {
			socket!.removeListener('new_message_item_data');
			socket!.removeListener('deleted_message_data');
			socket!.removeListener('updated_message_item_data');
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [messageListData, isLoading]);

	return isLoading ? (
		<Spinner />
	) : messageListData.length > 0 ? (
		<div className='messages-page'>
			<MessageList
				messageListData={messageListData}
				receiverName={username}
				deleteMessageFromListData={deleteMessageFromListData}
				updateMessageInListData={updateMessageInListData}
			/>

			<SendMessageForm
				receiverName={username}
				addMessageToListData={addMessageToListData}
			/>
		</div>
	) : isError ? null : (
		<NoMessages username={username} />
	);
};

export default MessagesPage;
