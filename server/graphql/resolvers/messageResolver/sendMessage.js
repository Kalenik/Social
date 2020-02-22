const Message = require('../../../models/message'),
	User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError'),
	dateToNumber = require('../../../utils/dateToNumber');

const sendMessage = async (args, { req, res, io, userSocketIds }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		if (!args.messageText) {
			throw new HttpError(400, "Can't send empty message");
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

		const currentDate = new Date();

		const messagesFromYou = await Message.findOne({
			$and: [{ from: req.userId }, { to: receiverUser._id }]
		});

		let resultOfMessageSave;

		if (!messagesFromYou) {
			const message = new Message({
				from: req.userId,
				to: receiverUser._id,
				messages: [
					{
						messageText: args.messageText,
						created: currentDate,
						updated: currentDate
					}
				]
			});

			resultOfMessageSave = await message.save();
		} else {
			messagesFromYou.messages.push({
				messageText: args.messageText,
				created: currentDate,
				updated: currentDate
			});

			resultOfMessageSave = await messagesFromYou.save();
		}

		const addedMessage = resultOfMessageSave.messages.find(
			m => m.messageText === args.messageText && m.created === currentDate
		);

		const newMessageData = {
			username: senderUser.username,
			profileImgSrc: senderUser.profileImgSrc,
			message: {
				...addedMessage._doc,
				created: dateToNumber(addedMessage.created).toString(),
				updated: dateToNumber(addedMessage.updated).toString()
			}
		};

		const newMessageNotice = {
			messageId: addedMessage._id,
			messageText: addedMessage.messageText,
			senderName: senderUser.username,
			senderProfileImgSrc: senderUser.profileImgSrc
		};

		const receiverSocketId = userSocketIds[args.receiverName];
		io.to(receiverSocketId).emit('new_message_item_data', newMessageData);
		io.to(receiverSocketId).emit('new_message_notice', newMessageNotice);

		return {
			...addedMessage._doc
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = sendMessage;
