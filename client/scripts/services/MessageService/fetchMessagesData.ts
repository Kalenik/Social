import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchMessagesData(token: string, receiverName: string) {
	const requestBody: IRequestBody = {
		query: `
            query MessagesData($receiverName:String!) {
                messagesData(receiverName:$receiverName) {
                    messagesFromYou {
                        _id
                        messageText
                        created
                        updated
                    }
                    messagesToYou {
                        _id
                        messageText
                        created
                        updated
                    }
                    receiverUser {
                        username
                        profileImgSrc
                    }
                }
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
		({ data: { messagesData } }) => {
			if (messagesData) {
				return messagesData;
			} else {
				const error: Array<Error> = [
					new Error('There are no messages')
				];
				throw error;
			}
		}
	);
}
