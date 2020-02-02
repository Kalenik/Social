const bcrypt = require('bcryptjs'),
	User = require('../../../models/user'),
	createAccessToken = require('../../../helpers/auth/createAccessToken'),
	createRefreshToken = require('../../../helpers/auth/createRefreshToken'),
	sendRefreshToken = require('../../../helpers/auth/sendRefreshToken'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const login = async (args, { res }) => {
	try {
		const foundUser = await User.findOne({ email: args.email });

		if (!foundUser) {
			throw new HttpError(401, 'User does not exists');
		}

		const isPasswordCorrect = await bcrypt.compare(
			args.password,
			foundUser.password
		);

		if (!isPasswordCorrect) {
			throw new HttpError(401, 'Password is incorrect!');
		}

		sendRefreshToken(res, createRefreshToken(foundUser));

		return {
			user: transformUser(foundUser),
			accessToken: createAccessToken(foundUser),
			tokenExpiration: 15 // 15 min
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = login;
