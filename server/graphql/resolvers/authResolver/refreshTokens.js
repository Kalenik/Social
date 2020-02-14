const jwt = require('jsonwebtoken'),
	config = require('config'),
	User = require('../../../models/user'),
	createAccessToken = require('../../../helpers/auth/createAccessToken'),
	createRefreshToken = require('../../../helpers/auth/createRefreshToken'),
	sendRefreshToken = require('../../../helpers/auth/sendRefreshToken'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const refreshTokens = async (args, { req, res }) => {
	try {
		const refreshToken = req.cookies.jid;
		let decodedRefreshToken = null;

		if (!refreshToken) {
			throw new HttpError(401, 'You do not have refresh token');
		}

		decodedRefreshToken = jwt.verify(
			refreshToken,
			config.get('jwt.refreshToken')
		);

		if (!decodedRefreshToken) {
			throw new HttpError(401, 'Your refresh token can not be decoded');
		}

		const foundUser = await User.findOne({
			_id: decodedRefreshToken.userId
		});

		if (!foundUser) {
			throw new HttpError(
				401,
				'User have not been found by refresh token data'
			);
		}

		if (foundUser.tokenVersion !== decodedRefreshToken.tokenVersion) {
			throw new HttpError(401, 'Not correct token version');
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

module.exports = refreshTokens;
