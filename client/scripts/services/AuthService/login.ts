import IRequestBody from '@interfaces/IRequestBody';
import baseAuthRequest from './base/baseAuthRequest';
import baseRequestBody from './base/baseRequestBody';

export default function login(email: string, password: string) {
	const requestBody: IRequestBody = {
		query: `
            query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    ${baseRequestBody}
                }
            }
        `,
		variables: {
			email,
			password
		}
	};

	return baseAuthRequest('login', requestBody);
}
