const log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const deleteRefreshToken = (args, { req, res }) => {
	try {
		if (!req.cookies.jid) {
			return true;
		}

		if (!req.isAuth) {
			throw new HttpError(401);
		}

		res.clearCookie('jid', {
			secure: process.env.NODE_ENV === 'production', // send only on https
			sameSite: 'Strict'
		});

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = deleteRefreshToken;
