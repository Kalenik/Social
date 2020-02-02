const util = require('util'),
	http = require('http');

function HttpError(status, message) {
	Error.apply(this, arguments);
	Error.captureStackTrace(this, HttpError);

	this.status = status;
	this.message = message || http.STATUS_CODES[status] || 'Http Error';
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

module.exports = HttpError;
