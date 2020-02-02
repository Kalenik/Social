const Message = require('../../../models/message'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const lastMessagesData = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const messagesDataFromYou = await Message.find({
			from: req.userId
		}).populate('to');
		const messagesDataToYou = await Message.find({
			to: req.userId
		}).populate('from');

		const mapMessagesData = messagesData => {
			const result = [];

			messagesData.forEach(messageData => {
				if (messageData.messages.length > 0) {
					result.push({
						from: messageData.from,
						to: messageData.to,
						lastMessage:
							messageData.messages[
								messageData.messages.length - 1
							]
					});
				}
			});

			return result;
		};

		return {
			lastMessagesDataFromYou: mapMessagesData(messagesDataFromYou),
			lastMessagesDataToYou: mapMessagesData(messagesDataToYou)
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = lastMessagesData;
