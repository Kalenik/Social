const createUser = require('./createUser'),
	login = require('./login'),
	refreshToken = require('./refreshToken'),
	deleteRefreshToken = require('./deleteRefreshToken'),
	revokeRefreshToken = require('./revokeRefreshToken');

module.exports = {
	createUser,
	login,
	refreshToken,
	deleteRefreshToken,
	revokeRefreshToken
};
