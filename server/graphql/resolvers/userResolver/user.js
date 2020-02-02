const User = require('../../../models/user'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const user = async (args, { res }) => {
	try {
		const foundUser = await User.findOne({ username: args.userName });

		if (!foundUser) {
			throw new HttpError(404, `User ${args.userName} not found.`);
		}

		return transformUser(foundUser);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = user;
