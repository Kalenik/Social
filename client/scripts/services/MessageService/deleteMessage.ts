import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function deleteMessage(
	token: string,
	receiverName: string,
	messageId: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation DeleteMessage($receiverName:String!, $messageId:ID!) {
                deleteMessage(receiverName:$receiverName, messageId: $messageId)
            }
        `,
		variables: {
			receiverName,
			messageId
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { deleteMessage } }) => {
			if (deleteMessage) {
				return true;
			} else {
				const error: Array<Error> = [
					new Error("Message was't deleted")
				];
				throw error;
			}
		}
	);
}
