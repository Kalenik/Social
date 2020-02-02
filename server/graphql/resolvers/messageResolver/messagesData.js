const Message = require('../../../models/message'),
	User = require('../../../models/user'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const messagesData = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const receiverUser = await User.findOne({
			username: args.receiverName
		});

		if (!receiverUser) {
			throw new HttpError(404, `User ${args.receiverName} not found.`);
		}

		const messagesFromYou = await Message.findOne({
			$and: [{ from: req.userId }, { to: receiverUser._id }]
		});
		const messagesToYou = await Message.findOne({
			$and: [{ from: receiverUser._id }, { to: req.userId }]
		});

		return {
			messagesFromYou: messagesFromYou ? messagesFromYou.messages : [],
			messagesToYou: messagesToYou ? messagesToYou.messages : [],
			receiverUser: transformUser(receiverUser)
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = messagesData;
