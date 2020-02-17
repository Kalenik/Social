import IMessage from './IMessage';

export default interface ILastMessageItemData {
	username: string;
	profileImgSrc?: string;
	lastMessage: IMessage;
	isViewed: boolean;
	isYour: boolean;
}
