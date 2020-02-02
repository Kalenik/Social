import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import HttpService from './HttpService';

export default class UserService {
	public static fetchUsers(exceptUserId?: string) {
		const requestBody: IRequestBody = {
			query: `
				query Users ($id:ID) {
					users(exceptUserId: $id) {
						_id
						username
						email
					}
				}
			`,
			variables: {
				id: exceptUserId
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options).then(
			({ data: { users } }) => {
				if (users && users.length > 0) {
					return users;
				} else {
					const error: Array<Error> = [
						new Error('There are no users')
					];
					throw error;
				}
			}
		);
	}

	public static fetchUser(userName: string) {
		const requestBody: IRequestBody = {
			query: `
				query User($userName:String!) {
					user(userName:$userName) {
						_id
						username
						email
						city
						extraInfo
						profileImgSrc
						friends {
							_id
						}
						following {
							_id
						}
						followers {
							_id
						}
						createdPosts {
							_id
							title
							text
							created
							updated
							creator {
								_id
							}
						}
					}
				}
			`,
			variables: {
				userName
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options).then(
			({ data: { user } }) => {
				if (user) {
					return user;
				} else {
					const error: Array<Error> = [new Error('User not found')];
					throw error;
				}
			}
		);
	}

	public static editUser(
		token: string,
		username: string,
		email: string,
		city?: string,
		extraInfo?: string,
		newPassword?: string,
		currentPassword?: string
	) {
		const requestBody: IRequestBody = {
			query: `
				mutation EditUser($username:String!, $email: String!, $city: String, $extraInfo: String, $newPassword: String, $currentPassword: String ) {
					editUser(editUserInput: {username: $username, email: $email, city: $city, extraInfo: $extraInfo, newPassword: $newPassword, currentPassword: $currentPassword}) {
						_id
						username
						email
						city
						extraInfo
						profileImgSrc
						friends {
							_id
						}
						following {
							_id
						}
						followers {
							_id
						}
						createdPosts {
							_id
							title
							text
							created
							updated
							creator {
								_id
							}
						}
					}
				}
			`,
			variables: {
				username,
				email,
				city,
				extraInfo,
				newPassword,
				currentPassword
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { editUser } }) => {
				if (editUser) {
					return editUser;
				} else {
					const error: Array<Error> = [
						new Error('Edit User is failed')
					];
					throw error;
				}
			}
		);
	}

	public static fetchUserSubscribers(
		userName: string,
		subscribersType: string
	) {
		const requestBody: IRequestBody = {
			query: `
				query User($userName:String!) {
					user(userName:$userName) {
						${subscribersType} {
							_id
							username
							email
						}
					}
				}
			`,
			variables: {
				userName
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options).then(
			({ data: { user } }) => {
				if (user[subscribersType]) {
					return user[subscribersType];
				} else {
					const error: Array<Error> = [
						new Error(
							`${subscribersType[0].toUpperCase() +
								subscribersType.slice(1)} not found`
						)
					];
					throw error;
				}
			}
		);
	}

	public static followUser(token: string, userId: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation FollowUser($id: ID!) {
					followUser(userId:$id) {
						user {
							username
						}
						subscriberType
					} 
				}
			`,
			variables: {
				id: userId
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({
				data: {
					followUser: {
						user: { username },
						subscriberType
					}
				}
			}) => {
				if (username && subscriberType) {
					return { username, subscriberType };
				} else {
					const error: Array<Error> = [
						new Error('Follow User is failed')
					];
					throw error;
				}
			}
		);
	}

	public static unfollowUser(token: string, userId: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation UnfollowUser($id: ID!) {
					unfollowUser(userId:$id) {
						user {
							username
						}
						subscriberType
					} 
				}
			`,
			variables: {
				id: userId
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({
				data: {
					unfollowUser: {
						user: { username },
						subscriberType
					}
				}
			}) => {
				if (username && subscriberType) {
					return { username, subscriberType };
				} else {
					const error: Array<Error> = [
						new Error('Unfollow User is failed')
					];
					throw error;
				}
			}
		);
	}
}
