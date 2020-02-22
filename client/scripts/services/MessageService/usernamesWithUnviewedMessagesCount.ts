import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function getUsernamesWithUnviewedMessagesCount(token: string) {
	const requestBody: IRequestBody = {
		query: `
			query {
				usernamesWithUnviewedMessagesCount {
					username
					unviewedCount
				}
			}
		`
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { usernamesWithUnviewedMessagesCount } }) => {
			if (usernamesWithUnviewedMessagesCount) {
				return usernamesWithUnviewedMessagesCount;
			} else {
				const error: Array<Error> = [
					new Error(
						'Failed to get the usernames with unviewed messages count'
					)
				];
				throw error;
			}
		}
	);
}
