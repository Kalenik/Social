const Post = require('../../../models/post'),
	LikedPost = require('../../../models/likedPost'),
	{ transformLikedPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const likePost = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const foundPost = await LikedPost.findOne({
			$and: [{ post: args.postId }, { user: req.userId }]
		});

		if (foundPost) {
			throw new HttpError(400, 'Post is alredy liked');
		}

		const fetchedPost = await Post.findOne({ _id: args.postId });

		const likedPost = new LikedPost({
			user: req.userId,
			post: fetchedPost._id,
			created: Date.now()
		});

		const resultOfLikedPostSave = await likedPost.save();

		return transformLikedPost(resultOfLikedPostSave);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = likePost;
