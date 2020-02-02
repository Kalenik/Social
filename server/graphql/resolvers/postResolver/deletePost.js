const Post = require('../../../models/post'),
	User = require('../../../models/user'),
	LikedPost = require('../../../models/likedPost'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const deletePost = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		await User.updateOne(
			{ _id: req.userId },
			{ $pull: { createdPosts: args.postId } }
		);

		await LikedPost.deleteMany({ post: args.postId });

		await Post.deleteOne({ _id: args.postId });

		return true;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = deletePost;
