import LastMessageList from '@components/Messages/LastMessageList/LastMessageList';
import LastMessageListDataFilter from '@components/Messages/LastMessageListDataFilter';
import NoLastMessages from '@components/Messages/NoLastMessages';
import Spinner from '@components/Spinner';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import IDeletedMessageData from '@interfaces/IDeletedMessageData';
import ILastMessageData from '@interfaces/ILastMessageData';
import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import IMessageItemData from '@interfaces/IMessageItemData';
import {
	addMessageActionCreator,
	senderDeletedUnviewedMessageActionCreator,
	senderViewedYourMessagesActionCreator,
	setLastMessageListDataActionCreator,
	updateMessageActionCreator
} from '@reducers/LastMessagesReducer/lastMessageActionCreators';
import lastMessagesReducer from '@reducers/LastMessagesReducer/lastMessagesReducer';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import fetchLastMessagesData from '@services/MessageService/fetchLastMessagesData';
import dateToNumber from '@utils/dateToNumber';
import React, { useContext, useEffect, useReducer, useState } from 'react';

interface IFetchAllYourMessagesDataResponce {
	lastMessagesDataFromYou: Array<ILastMessageData>;
	lastMessagesDataToYou: Array<ILastMessageData>;
}

const LastMessagesPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		[isLoading, setLoading] = useState(true),
		{ socket } = useContext(SocketContext),
		{ token } = useContext(AuthContext),
		[lastMessageListData, lastMessageDispatch] = useReducer(
			lastMessagesReducer,
			[]
		),
		[
			filteredLastMessageListData,
			setFilteredLastMessageListData
		] = useState(lastMessageListData);

	const getLastMessagesData = () =>
		fetchLastMessagesData(token)
			.then(
				({
					lastMessagesDataFromYou,
					lastMessagesDataToYou
				}: IFetchAllYourMessagesDataResponce) => {
					const unsortedLastMessageListData: Array<ILastMessageItemData> = lastMessagesDataFromYou.map(
						lastMessageDataFromYou => {
							const username = lastMessageDataFromYou.to
									?.username!,
								profileImgSrc = lastMessageDataFromYou.to
									?.profileImgSrc!;

							let lastMessage =
									lastMessageDataFromYou.lastMessage,
								unviewedCount =
									lastMessageDataFromYou.unviewedCount,
								isYour = true;

							const lastMessageDataToYou = lastMessagesDataToYou.find(
								lastMessageDataToYou =>
									lastMessageDataToYou.from?.username ===
									username
							);

							if (
								lastMessageDataToYou &&
								dateToNumber(
									lastMessageDataToYou.lastMessage.created
								) >
									dateToNumber(
										lastMessageDataFromYou.lastMessage
											.created
									)
							) {
								lastMessage = lastMessageDataToYou.lastMessage;
								unviewedCount =
									lastMessageDataToYou.unviewedCount;
								isYour = false;
							}

							return {
								username,
								profileImgSrc,
								lastMessage,
								unviewedCount,
								isYour
							};
						}
					);

					lastMessagesDataToYou.forEach(lastMessageDataToYou => {
						if (
							!unsortedLastMessageListData.find(
								lastMessageItemData =>
									lastMessageItemData.username ===
									lastMessageDataToYou.from?.username
							)
						) {
							unsortedLastMessageListData.push({
								username: lastMessageDataToYou.from?.username!,
								profileImgSrc:
									lastMessageDataToYou.from?.profileImgSrc,
								lastMessage: lastMessageDataToYou.lastMessage,
								unviewedCount:
									lastMessageDataToYou.unviewedCount,
								isYour: false
							});
						}
					});

					lastMessageDispatch(
						setLastMessageListDataActionCreator(
							unsortedLastMessageListData.sort(
								(a, b) =>
									dateToNumber(b.lastMessage.updated) -
									dateToNumber(a.lastMessage.updated)
							)
						)
					);
				}
			)
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => setLoading(false));

	useEffect(() => {
		getLastMessagesData();

		socket!.on(
			'new_message_item_data',
			(newMessageItemData: IMessageItemData) =>
				lastMessageDispatch(addMessageActionCreator(newMessageItemData))
		);

		return () => {
			socket!.removeListener('new_message_item_data');
		};
	}, []);

	useEffect(() => {
		socket!.on(
			'deleted_message_data',
			({ senderName, deletedMessageId }: IDeletedMessageData) => {
				if (
					lastMessageListData.some(
						({ username, lastMessage }) =>
							username === senderName &&
							lastMessage._id === deletedMessageId
					)
				) {
					getLastMessagesData();
				}
			}
		);

		socket!.on(
			'updated_message_item_data',
			(upatedMessageItemData: IMessageItemData) =>
				lastMessageDispatch(
					updateMessageActionCreator(upatedMessageItemData)
				)
		);

		socket!.on('senderName_viewed_your_messages', (senderName: string) =>
			lastMessageDispatch(
				senderViewedYourMessagesActionCreator(senderName)
			)
		);

		socket!.on(
			'senderName_deleted_unviewed_message',
			(senderName: string) =>
				lastMessageDispatch(
					senderDeletedUnviewedMessageActionCreator(senderName)
				)
		);

		return () => {
			socket!.removeListener('deleted_message_data');
			socket!.removeListener('updated_message_item_data');
			socket!.removeListener('username_viewed_your_messages');
			socket!.removeListener('senderName_deleted_unviewed_message');
		};
	}, [lastMessageListData]);

	return isLoading ? (
		<Spinner />
	) : lastMessageListData.length > 0 ? (
		<div className='last-messages-page'>
			<LastMessageListDataFilter
				lastMessageListData={lastMessageListData}
				filteredLastMessageListData={filteredLastMessageListData}
				setFilteredLastMessageListData={setFilteredLastMessageListData}
			/>

			<LastMessageList
				lastMessageListData={filteredLastMessageListData}
			/>
		</div>
	) : (
		<NoLastMessages />
	);
};

export default LastMessagesPage;
