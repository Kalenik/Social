const getPublicIdFromUrl = (url, folder) =>
	folder +
	'/' +
	url
		.split('/')
		.pop()
		.split('.')[0];

module.exports = getPublicIdFromUrl;
