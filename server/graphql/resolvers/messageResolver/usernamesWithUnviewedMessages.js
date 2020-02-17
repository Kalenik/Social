const Message = require('../../../models/message'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const usernamesWithUnviewedMessages = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const messagesDataToYou = await Message.find({
			to: req.userId
		}).populate('from');

		const usernamesWithUnviewedMessages = [];

		messagesDataToYou &&
			messagesDataToYou.forEach(
				messageData =>
					!messageData.isViewed &&
					usernamesWithUnviewedMessages.push(
						messageData.from.username
					)
			);

		return usernamesWithUnviewedMessages;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = usernamesWithUnviewedMessages;
