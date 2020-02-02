const authResolver = require('./authResolver'),
	userResolver = require('./userResolver'),
	postResolver = require('./postResolver'),
	likedPostResolver = require('./likedPostResolver'),
	messageResolver = require('./messageResolver');

module.exports = {
	...authResolver,
	...userResolver,
	...postResolver,
	...likedPostResolver,
	...messageResolver
};
