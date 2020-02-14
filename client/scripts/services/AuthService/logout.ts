import Config from '@config';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function logout(accessToken: string) {
	const requestBody = { query: `mutation { deleteRefreshToken }` };

	const options = {
		body: JSON.stringify(requestBody),
		credentials: 'include' as RequestCredentials
	};

	return postJSON(Config.graphqlPath, options, accessToken).then(
		({ data: { deleteRefreshToken } }) => {
			if (deleteRefreshToken) {
				return true;
			} else {
				const error: Array<Error> = [
					new Error('Failed to delete refresh token')
				];
				throw error;
			}
		}
	);
}
