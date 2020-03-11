import IMessage from '@interfaces/IMessage';
import IMessageItemData from '@interfaces/IMessageItemData';
import { messagesReducerActionType } from './messagesReducer';

export const setMessageListDataActionCreator = (
	messageListData: Array<IMessageItemData>
): messagesReducerActionType => ({
	type: 'SetMessageListData',
	messageListData
});

export const addMessageActionCreator = (
	newMessageItemData: IMessageItemData
): messagesReducerActionType => ({
	type: 'AddMessage',
	newMessageItemData
});

export const updateMessageActionCreator = (
	updatedMessage: IMessage
): messagesReducerActionType => ({
	type: 'UpdateMessage',
	updatedMessage
});

export const deleteMessageActionCreator = (
	messageId: string
): messagesReducerActionType => ({
	type: 'DeleteMessage',
	messageId
});
