const User = require('../../../models/user'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename);

const users = async args => {
	try {
		const users = await User.find({
			_id: { $ne: args.exceptUserId || undefined }
		});

		return users.map(transformUser);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = users;
