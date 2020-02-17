import IMessage from './IMessage';
import IUser from './IUser';

export default interface ILastMessageData {
	from?: IUser;
	to?: IUser;
	lastMessage: IMessage;
	isViewed: boolean;
}
