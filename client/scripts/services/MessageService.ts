import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import HttpService from './HttpService';

export default class MessageService {
	public static fetchLastMessagesData(token: string) {
		const requestBody: IRequestBody = {
			query: `
				query {
					lastMessagesData {
						lastMessagesDataFromYou {
							to {
								username
								profileImgSrc
							}
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

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
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

	public static fetchMessagesData(token: string, receiverName: string) {
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

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
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

	public static sendMessage(
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

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { sendMessage } }) => {
				if (sendMessage) {
					return sendMessage;
				} else {
					const error: Array<Error> = [
						new Error("Message was't sent")
					];
					throw error;
				}
			}
		);
	}

	public static deleteMessage(
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

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
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

	public static editMessage(
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

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
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
}
