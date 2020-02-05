import LastMessageList from '@components/Messages/LastMessageList/LastMessageList';
import NoLastMessages from '@components/Messages/NoLastMessages';
import Spinner from '@components/Spinner';
import AuthContext from '@contexts/authContext';
import NoticeContext from '@contexts/noticeContext';
import SocketContext from '@contexts/socketContext';
import { dateToNumber } from '@helpers/Utils';
import IDeletedMessageData from '@interfaces/IDeletedMessageData';
import ILastMessageData from '@interfaces/ILastMessageData';
import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import IMessageItemData from '@interfaces/IMessageItemData';
import { addErrorNoticesActionCreator } from '@reducers/NoticesReducer/NoticeActionCreators';
import MessageService from '@services/MessageService';
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
		>([]);

	const fetchLastMessagesData = () =>
		MessageService.fetchLastMessagesData(token)
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
								lastMessageDataFromYou.lastMessage;

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
							}

							return {
								username,
								profileImgSrc,
								lastMessage
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
								lastMessage: lastMessageDataToYou.lastMessage
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
		fetchLastMessagesData();

		socket!.on(
			'new_message_item_data',
			(newMessageItemData: IMessageItemData) =>
				setLastMessageListData(prevLastMessageListData => [
					{
						username: newMessageItemData.username,
						profileImgSrc: newMessageItemData.profileImgSrc,
						lastMessage: newMessageItemData.message
					},
					...prevLastMessageListData.filter(
						lastMessageItemData =>
							lastMessageItemData.username !==
							newMessageItemData.username
					)
				])
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
						lastMessageItemData =>
							lastMessageItemData.username === senderName &&
							lastMessageItemData.lastMessage._id ===
								deletedMessageId
					)
				) {
					fetchLastMessagesData();
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

		return () => {
			socket!.removeListener('deleted_message_data');
			socket!.removeListener('updated_message_item_data');
		};
	}, [lastMessageListData]);

	return isLoading ? (
		<Spinner />
	) : lastMessageListData.length > 0 ? (
		<div className='last-messages-page'>
			<LastMessageList lastMessageListData={lastMessageListData} />
		</div>
	) : (
		<NoLastMessages />
	);
};

export default LastMessagesPage;
