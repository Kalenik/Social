import IUser from './IUser';

export default interface IPost {
	_id?: string;
	title?: string;
	text?: string;
	created?: string;
	updated?: string;
	creator?: IUser;
}
