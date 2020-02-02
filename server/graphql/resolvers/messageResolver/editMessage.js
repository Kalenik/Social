const Message = require('../../../models/message'),
	User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const editMessage = async (args, { req, res, io, userSocketIds }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const editMessageInput = args.editMessageInput;

		if (!editMessageInput.newMessageText) {
			throw new HttpError(400, "Can't send empty message");
		}

		const senderUser = await User.findById(req.userId);

		if (!senderUser) {
			throw new HttpError(404, 'Your user not found');
		}

		const receiverUser = await User.findOne({
			username: editMessageInput.receiverName
		});

		if (!receiverUser) {
			throw new HttpError(404, `User ${args.receiverName} not found.`);
		}

		const messagesFromYou = await Message.findOne({
			$and: [{ from: req.userId }, { to: receiverUser._id }]
		});

		if (!messagesFromYou) {
			throw new HttpError(
				400,
				`You don't have messages to ${args.receiverName}`
			);
		}

		const indexOfUpdatingMessage = messagesFromYou.messages.findIndex(
			m => m._id == editMessageInput.messageId
		);

		if (indexOfUpdatingMessage === -1) {
			throw new HttpError(400, "Can't update this message");
		}

		const currentDate = new Date();

		messagesFromYou.messages[indexOfUpdatingMessage].messageText =
			editMessageInput.newMessageText;
		messagesFromYou.messages[indexOfUpdatingMessage].updated = currentDate;

		const resultOfMessageSave = await messagesFromYou.save();

		const updatedMessage =
			resultOfMessageSave.messages[indexOfUpdatingMessage];

		const updatedMessageData = {
			senderName: senderUser.username,
			messageId: updatedMessage._id,
			newMessageText: updatedMessage.messageText,
			updated: new Date(updatedMessage.updated).getTime().toString()
		};

		const receiverSocketId = userSocketIds[args.receiverName];
		io.to(receiverSocketId).emit(
			'updated_message_item_data',
			updatedMessageData._doc
		);

		return {
			...updatedMessage._doc
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = editMessage;
