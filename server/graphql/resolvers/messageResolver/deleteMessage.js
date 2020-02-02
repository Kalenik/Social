const Message = require('../../../models/message'),
	User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const deleteMessage = async (args, { req, res, io, userSocketIds }) => {
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

		const messagesFromYou = await Message.findOne({
			$and: [{ from: req.userId }, { to: receiverUser._id }]
		});

		const indexOfDeletingMessage = messagesFromYou.messages.findIndex(
			m => m._id == args.messageId
		);

		if (indexOfDeletingMessage === -1) {
			throw new HttpError(400, "Can't delete this message");
		}

		messagesFromYou.messages.splice(indexOfDeletingMessage, 1);

		await messagesFromYou.save();

		const receiverSocketId = userSocketIds[args.receiverName];

		io.to(receiverSocketId).emit('deleted_message_data', {
			deletedMessageId: args.messageId,
			senderName: senderUser.username
		});

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = deleteMessage;
