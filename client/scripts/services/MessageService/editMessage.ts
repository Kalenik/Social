import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function editMessage(
	token: string,
	receiverName: string,
	messageId: string,
	newMessageText: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation EditMessage($receiverName:String!, $messageId:ID!, $newMessageText:String!) {
                editMessage(editMessageInput: {receiverName:$receiverName, messageId: $messageId, newMessageText: $newMessageText}) {
                    _id
                    messageText
                    created
                    updated
                }
            }
        `,
		variables: {
			receiverName,
			messageId,
			newMessageText
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { editMessage } }) => {
			if (editMessage) {
				return editMessage;
			} else {
				const error: Array<Error> = [
					new Error("Message was't updated")
				];
				throw error;
			}
		}
	);
}
