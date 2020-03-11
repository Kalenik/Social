import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import IMessageItemData from '@interfaces/IMessageItemData';

export type lastMessagesReducerActionType =
	| {
			type: 'SetLastMessageListData';
			lastMessageListData: Array<ILastMessageItemData>;
	  }
	| { type: 'AddMessage'; newMessageItemData: IMessageItemData }
	| { type: 'UpdateMessage'; upatedMessageItemData: IMessageItemData }
	| { type: 'SenderViewedYourMessages'; senderName: string }
	| { type: 'SenderDeletedUnviewedMessage'; senderName: string };

const addMessage = (
	prevLastMessageListData: Array<ILastMessageItemData>,
	newMessageItemData: IMessageItemData
) => {
	const prevLastMessageItemData = prevLastMessageListData.find(
		({ username }) => username === newMessageItemData.username
	);

	return prevLastMessageItemData
		? [
				{
					username: newMessageItemData.username,
					profileImgSrc: newMessageItemData.profileImgSrc,
					lastMessage: newMessageItemData.message,
					unviewedCount: prevLastMessageItemData.unviewedCount + 1,
					isYour: false
				},
				...prevLastMessageListData.filter(
					({ username }) => username !== newMessageItemData.username
				)
		  ]
		: [
				{
					username: newMessageItemData.username,
					profileImgSrc: newMessageItemData.profileImgSrc,
					lastMessage: newMessageItemData.message,
					unviewedCount: 1,
					isYour: false
				},
				...prevLastMessageListData
		  ];
};

const updateMessage = (
	prevLastMessageListData: Array<ILastMessageItemData>,
	upatedMessageItemData: IMessageItemData
) => {
	const lastMessageItemDataToUpdate = prevLastMessageListData.find(
		({ username, lastMessage }) =>
			username === upatedMessageItemData.username &&
			lastMessage._id === upatedMessageItemData.message._id
	);

	return lastMessageItemDataToUpdate
		? [
				{
					...lastMessageItemDataToUpdate,
					lastMessage: upatedMessageItemData.message
				},
				...prevLastMessageListData.filter(
					({ username }) =>
						username !== upatedMessageItemData.username
				)
		  ]
		: prevLastMessageListData;
};

const senderViewedYourMessagesHandler = (
	prevLastMessageListData: Array<ILastMessageItemData>,
	senderName: string
) =>
	prevLastMessageListData.map(lastMessageItemData =>
		lastMessageItemData.username === senderName
			? { ...lastMessageItemData, unviewedCount: 0 }
			: lastMessageItemData
	);

const senderDeletedUnviewedMessageHandler = (
	prevLastMessageListData: Array<ILastMessageItemData>,
	senderName: string
) =>
	prevLastMessageListData.map(lastMessageItemData =>
		lastMessageItemData.username === senderName &&
		lastMessageItemData.unviewedCount > 0
			? {
					...lastMessageItemData,
					unviewedCount: lastMessageItemData.unviewedCount - 1
			  }
			: lastMessageItemData
	);

const lastMessagesReducer = (
	state: Array<ILastMessageItemData>,
	action: lastMessagesReducerActionType
) => {
	switch (action.type) {
		case 'SetLastMessageListData':
			return action.lastMessageListData;
		case 'AddMessage':
			return addMessage(state, action.newMessageItemData);
		case 'UpdateMessage':
			return updateMessage(state, action.upatedMessageItemData);
		case 'SenderViewedYourMessages':
			return senderViewedYourMessagesHandler(state, action.senderName);
		case 'SenderDeletedUnviewedMessage':
			return senderDeletedUnviewedMessageHandler(
				state,
				action.senderName
			);
		default:
			return state;
	}
};

export default lastMessagesReducer;
