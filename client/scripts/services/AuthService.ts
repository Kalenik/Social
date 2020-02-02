import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import HttpService from './HttpService';

export default class AuthService {
	public static login(email: string, password: string) {
		const requestBody: IRequestBody = {
			query: `
				query Login($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						${this.baseRequestBody}
					}
				}
			`,
			variables: {
				email,
				password
			}
		};

		return this.baseAuthRequest('login', requestBody);
	}

	public static createUser(
		username: string,
		email: string,
		password: string
	) {
		const requestBody: IRequestBody = {
			query: `
				mutation CreateUser($username:String!, $email: String!, $password: String! ) {
					createUser(createUserInput: {username: $username, email: $email, password: $password}) {
						${this.baseRequestBody}
					}
				}
			`,
			variables: {
				username,
				email,
				password
			}
		};

		return this.baseAuthRequest('createUser', requestBody);
	}

	public static refreshToken() {
		const requestBody: IRequestBody = {
			query: `
				mutation {
					refreshToken {
						${this.baseRequestBody}
					}
				}
			`
		};

		return this.baseAuthRequest('refreshToken', requestBody);
	}

	public static logout(accessToken: string) {
		const requestBody = { query: `mutation { deleteRefreshToken }` };

		const options = {
			body: JSON.stringify(requestBody),
			credentials: 'include' as RequestCredentials
		};

		return HttpService.postJSON(
			Config.graphqlPath,
			options,
			accessToken
		).then(({ data: { deleteRefreshToken } }) => {
			if (deleteRefreshToken) {
				return true;
			} else {
				const error: Array<Error> = [
					new Error('Failed to delete refresh token')
				];
				throw error;
			}
		});
	}

	private static baseRequestBody: string = `
		user {
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
		accessToken
		tokenExpiration
	`;

	private static baseAuthRequest(
		methodName: string /* name of GraphQL method */,
		requestBody: IRequestBody
	) {
		const options = {
			body: JSON.stringify(requestBody),
			credentials: 'include' as RequestCredentials
		};

		return HttpService.postJSON(Config.graphqlPath, options).then(
			({
				data: {
					[methodName]: { user, accessToken, tokenExpiration }
				}
			}) => {
				if (
					user._id &&
					user.username &&
					accessToken &&
					tokenExpiration
				) {
					return {
						user,
						accessToken,
						tokenExpiration
					};
				} else {
					const error: Array<Error> = [
						new Error(`${methodName} is failed`)
					];
					throw error;
				}
			}
		);
	}
}
