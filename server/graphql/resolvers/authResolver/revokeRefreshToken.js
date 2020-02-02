const User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const revokeRefreshToken = async (args, { req, res }) => {
	// use it for changes password or for logout from all devices
	try {
		if (!req.userId) {
			throw new HttpError(401, 'No User Id');
		}

		await User.findByIdAndUpdate(
			{ _id: req.userId },
			{ $inc: { tokenVersion: 1 } }
		);

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = revokeRefreshToken;
