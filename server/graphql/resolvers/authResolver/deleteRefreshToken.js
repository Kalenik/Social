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

		res.clearCookie('jid');

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = deleteRefreshToken;
