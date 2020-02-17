const Message = require('../../../models/message'),
	User = require('../../../models/user'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const messagesViewed = async (args, { req, res, io, userSocketIds }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const senderUser = await User.findById(req.userId);

		if (!senderUser) {
			throw new HttpError(404, 'Your user not found');
		}

		const receiverUser = await User.findOne({
			username: args.receiverName
		});

		if (!receiverUser) {
			throw new HttpError(404, `User ${args.receiverName} not found.`);
		}

		const messagesToYou = await Message.findOne({
			$and: [{ from: receiverUser._id }, { to: req.userId }]
		});

		messagesToYou.isViewed = true;

		await messagesToYou.save();

		const receiverSocketId = userSocketIds[args.receiverName];
		io.to(receiverSocketId).emit(
			'username_viewed_your_messages',
			senderUser.username
		);

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = messagesViewed;
