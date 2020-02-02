import IPost from './IPost';

export default interface IUser {
	_id?: string;
	username?: string;
	email?: string;
	city?: string;
	extraInfo?: string;
	profileImgSrc?: string;
	friends?: Array<IUser>;
	following?: Array<IUser>;
	followers?: Array<IUser>;
	createdPosts?: Array<IPost>;
}
