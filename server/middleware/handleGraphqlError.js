const HttpError = require('../error/HttpError');

module.exports = function(req, res, next) {
	res.handleGraphqlError = error => {
		if (error instanceof HttpError) {
			res.status(error.status);
		}

		throw error;
	};

	next();
};
