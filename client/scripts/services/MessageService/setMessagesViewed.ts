import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function setMessagesViewed(token: string, receiverName: string) {
	const requestBody: IRequestBody = {
		query: `
			mutation MessagesViewed($receiverName:String!) {
                messagesViewed(receiverName:$receiverName)
            }
        `,
		variables: {
			receiverName
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { messagesViewed } }) => {
			if (messagesViewed) {
				return messagesViewed;
			} else {
				const error: Array<Error> = [
					new Error('Failed to set messages as viewed')
				];
				throw error;
			}
		}
	);
}
