import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchLastMessagesData(token: string) {
	const requestBody: IRequestBody = {
		query: `
            query {
                lastMessagesData {
                    lastMessagesDataFromYou {
                        to {
                            username
                            profileImgSrc
                        }
                        isViewed
                        lastMessage {
                            _id
                            messageText
                            created
                            updated
                        }
                    }
                    lastMessagesDataToYou {
                        from {
                            username
                            profileImgSrc
                        }
                        isViewed
                        lastMessage {
                            _id
                            messageText
                            created
                            updated
                        }
                    }
                }
            }
        `
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { lastMessagesData } }) => {
			if (lastMessagesData) {
				return lastMessagesData;
			} else {
				const error: Array<Error> = [
					new Error('There are no messages')
				];
				throw error;
			}
		}
	);
}
