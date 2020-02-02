const LikedPost = require('../../../models/likedPost'),
	{ transformPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const deleteLikedPost = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const likedPost = await LikedPost.findById(args.likedPostId).populate(
			'post'
		);

		const post = transformPost(likedPost.post);

		await LikedPost.deleteOne({ _id: args.likedPostId });

		return post;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = deleteLikedPost;
