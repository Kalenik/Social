import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function getUsernamesWithUnviewedMessages(token: string) {
	const requestBody: IRequestBody = {
		query: `query  { usernamesWithUnviewedMessages }`
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { usernamesWithUnviewedMessages } }) => {
			if (usernamesWithUnviewedMessages) {
				return usernamesWithUnviewedMessages;
			} else {
				const error: Array<Error> = [
					new Error(
						'Failed to get the usernames with unviewed messages'
					)
				];
				throw error;
			}
		}
	);
}
