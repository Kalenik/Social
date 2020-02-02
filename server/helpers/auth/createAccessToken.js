const jwt = require('jsonwebtoken'),
	config = require('config');

module.exports = user =>
	jwt.sign(
		{
			userId: user.id
		},
		config.get('jwt.accessToken'),
		{
			expiresIn: '15m'
		}
	);
