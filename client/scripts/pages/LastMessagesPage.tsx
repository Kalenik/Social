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
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import fetchLastMessagesData from '@services/MessageService/fetchLastMessagesData';
import dateToNumber from '@utils/dateToNumber';
import React, { useContext, useEffect, useState } from 'react';

interface IFetchAllYourMessagesDataResponce {
	lastMessagesDataFromYou: Array<ILastMessageData>;
	lastMessagesDataToYou: Array<ILastMessageData>;
}

const LastMessagesPage: React.FC = () => {
	const noticeContextDispatch = useContext(NoticeContext),
		[isLoading, setLoading] = useState(true),
		{ socket } = useContext(SocketContext),
		{ token } = useContext(AuthContext),
		[lastMessageListData, setLastMessageListData] = useState<
			Array<ILastMessageItemData>
		>([]),
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

					setLastMessageListData(() =>
						unsortedLastMessageListData.sort(
							(a, b) =>
								dateToNumber(b.lastMessage.updated) -
								dateToNumber(a.lastMessage.updated)
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
				setLastMessageListData(prevLastMessageListData => {
					const prevLastMessageItemData = prevLastMessageListData.find(
						({ username }) =>
							username === newMessageItemData.username
					);

					return prevLastMessageItemData
						? [
								{
									username: newMessageItemData.username,
									profileImgSrc:
										newMessageItemData.profileImgSrc,
									lastMessage: newMessageItemData.message,
									unviewedCount:
										prevLastMessageItemData.unviewedCount +
										1,
									isYour: false
								},
								...prevLastMessageListData.filter(
									({ username }) =>
										username !== newMessageItemData.username
								)
						  ]
						: [
								{
									username: newMessageItemData.username,
									profileImgSrc:
										newMessageItemData.profileImgSrc,
									lastMessage: newMessageItemData.message,
									unviewedCount: 1,
									isYour: false
								},
								...prevLastMessageListData
						  ];
				})
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
			(upatedMessageItemData: IMessageItemData) => {
				const lastMessageItemDataToUpdate = lastMessageListData.find(
					lastMessageItemData =>
						lastMessageItemData.username ===
							upatedMessageItemData.username &&
						lastMessageItemData.lastMessage._id ===
							upatedMessageItemData.message._id
				);

				if (lastMessageItemDataToUpdate) {
					setLastMessageListData(prevLastMessageListData => [
						{
							...lastMessageItemDataToUpdate,
							lastMessage: upatedMessageItemData.message
						},
						...prevLastMessageListData.filter(
							lastMessageItemData =>
								lastMessageItemData.username !==
								upatedMessageItemData.username
						)
					]);
				}
			}
		);

		socket!.on('username_viewed_your_messages', (username: string) =>
			setLastMessageListData(prevLastMessageListData =>
				prevLastMessageListData.map(lastMessageItemData =>
					lastMessageItemData.username === username
						? { ...lastMessageItemData, unviewedCount: 0 }
						: lastMessageItemData
				)
			)
		);

		socket!.on(
			'senderName_deleted_unviewed_message',
			(senderName: string) => {
				setLastMessageListData(prevLastMessageListData =>
					prevLastMessageListData.map(lastMessageItemData =>
						lastMessageItemData.username === senderName &&
						lastMessageItemData.unviewedCount > 0
							? {
									...lastMessageItemData,
									unviewedCount:
										lastMessageItemData.unviewedCount - 1
							  }
							: lastMessageItemData
					)
				);
			}
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
