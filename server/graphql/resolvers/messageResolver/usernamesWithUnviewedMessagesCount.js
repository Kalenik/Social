const Message = require('../../../models/message'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const usernamesWithUnviewedMessagesCount = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const messagesDataToYou = await Message.find({
			to: req.userId
		}).populate('from');

		const usernamesWithUnviewedMessagesCount = [];

		messagesDataToYou &&
			messagesDataToYou.forEach(messageData => {
				const unviewedCount = messageData.messages.filter(
					m => !m.isViewed
				).length;

				unviewedCount &&
					usernamesWithUnviewedMessagesCount.push({
						username: messageData.from.username,
						unviewedCount
					});
			});

		return usernamesWithUnviewedMessagesCount;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = usernamesWithUnviewedMessagesCount;
