import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function sendMessage(
	token: string,
	receiverName: string,
	messageText: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation SendMessage($receiverName:String!, $messageText:String!) {
                sendMessage(receiverName:$receiverName, messageText: $messageText) {
                    _id
                    messageText
                    created
                    updated
                }
            }
        `,
		variables: {
			receiverName,
			messageText
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { sendMessage } }) => {
			if (sendMessage) {
				return sendMessage;
			} else {
				const error: Array<Error> = [new Error("Message was't sent")];
				throw error;
			}
		}
	);
}
