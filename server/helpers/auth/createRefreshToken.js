const jwt = require('jsonwebtoken'),
	config = require('config');

module.exports = user =>
	jwt.sign(
		{
			userId: user.id,
			tokenVersion: user.tokenVersion
		},
		config.get('jwt.refreshToken'),
		{
			expiresIn: '7d'
		}
	);
