import IMessage from './IMessage';

export default interface ILastMessageItemData {
	username: string;
	profileImgSrc?: string;
	lastMessage: IMessage;
	unviewedCount: number;
	isYour: boolean;
}
