import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import IMessageItemData from '@interfaces/IMessageItemData';
import { lastMessagesReducerActionType } from './lastMessagesReducer';

export const setLastMessageListDataActionCreator = (
	lastMessageListData: Array<ILastMessageItemData>
): lastMessagesReducerActionType => ({
	type: 'SetLastMessageListData',
	lastMessageListData
});

export const addMessageActionCreator = (
	newMessageItemData: IMessageItemData
): lastMessagesReducerActionType => ({
	type: 'AddMessage',
	newMessageItemData
});

export const updateMessageActionCreator = (
	upatedMessageItemData: IMessageItemData
): lastMessagesReducerActionType => ({
	type: 'UpdateMessage',
	upatedMessageItemData
});

export const senderViewedYourMessagesActionCreator = (
	senderName: string
): lastMessagesReducerActionType => ({
	type: 'SenderViewedYourMessages',
	senderName
});

export const senderDeletedUnviewedMessageActionCreator = (
	senderName: string
): lastMessagesReducerActionType => ({
	type: 'SenderDeletedUnviewedMessage',
	senderName
});
