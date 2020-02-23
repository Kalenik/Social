const getMimeStringFromDataURL = dataURL =>
	dataURL
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];

module.exports = getMimeStringFromDataURL;
