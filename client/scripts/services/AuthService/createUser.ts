import IRequestBody from '@interfaces/IRequestBody';
import baseAuthRequest from './base/baseAuthRequest';
import baseRequestBody from './base/baseRequestBody';

export default function createUser(
	username: string,
	email: string,
	password: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation CreateUser($username:String!, $email: String!, $password: String! ) {
                createUser(createUserInput: {username: $username, email: $email, password: $password}) {
                    ${baseRequestBody}
                }
            }
        `,
		variables: {
			username,
			email,
			password
		}
	};

	return baseAuthRequest('createUser', requestBody);
}
