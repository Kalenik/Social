const createUser = require('./createUser'),
	login = require('./login'),
	refreshTokens = require('./refreshTokens'),
	deleteRefreshToken = require('./deleteRefreshToken'),
	revokeRefreshToken = require('./revokeRefreshToken');

module.exports = {
	createUser,
	login,
	refreshTokens,
	deleteRefreshToken,
	revokeRefreshToken
};
