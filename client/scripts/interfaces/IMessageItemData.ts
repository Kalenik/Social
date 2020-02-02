import IMessage from './IMessage';

export default interface IMessageItemData {
	username: string;
	profileImgSrc?: string;
	message: IMessage;
}
