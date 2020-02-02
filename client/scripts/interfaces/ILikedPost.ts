import IPost from './IPost';
import IUser from './IUser';

export default interface ILikedPost {
	_id?: string;
	post?: IPost;
	user?: IUser;
	created?: string;
}
