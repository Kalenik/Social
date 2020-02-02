const LikedPost = require('../../../models/likedPost'),
	{ transformLikedPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const likedPosts = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const likedPosts = await LikedPost.find({ user: req.userId });

		return likedPosts.map(transformLikedPost);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = likedPosts;
