import IMessage from '@interfaces/IMessage';
import IMessageItemData from '@interfaces/IMessageItemData';

export type messagesReducerActionType =
	| {
			type: 'SetMessageListData';
			messageListData: Array<IMessageItemData>;
	  }
	| { type: 'AddMessage'; newMessageItemData: IMessageItemData }
	| { type: 'UpdateMessage'; updatedMessage: IMessage }
	| { type: 'DeleteMessage'; messageId: string };

const addMessage = (
	prevMessageListData: Array<IMessageItemData>,
	newMessageItemData: IMessageItemData
) => [...prevMessageListData, newMessageItemData];

const updateMessage = (
	prevMessageListData: Array<IMessageItemData>,
	updatedMessage: IMessage
) =>
	prevMessageListData.map(messageItemData =>
		messageItemData.message._id !== updatedMessage._id
			? messageItemData
			: { ...messageItemData, message: updatedMessage }
	);

const deleteMessage = (
	prevMessageListData: Array<IMessageItemData>,
	messageId: string
) =>
	prevMessageListData.filter(
		messageItemData => messageItemData.message._id !== messageId
	);

const messagesReducer = (
	state: Array<IMessageItemData>,
	action: messagesReducerActionType
) => {
	switch (action.type) {
		case 'SetMessageListData':
			return action.messageListData;
		case 'AddMessage':
			return addMessage(state, action.newMessageItemData);
		case 'UpdateMessage':
			return updateMessage(state, action.updatedMessage);
		case 'DeleteMessage':
			return deleteMessage(state, action.messageId);
		default:
			return state;
	}
};

export default messagesReducer;
