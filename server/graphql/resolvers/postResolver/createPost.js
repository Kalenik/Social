const Post = require('../../../models/post'),
	User = require('../../../models/user'),
	{ transformPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const createPost = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const currentDate = Date.now();

		const post = new Post({
			title: args.title,
			text: args.text,
			created: currentDate,
			updated: currentDate,
			creator: req.userId
		});

		const rezultOfPostSave = await post.save();

		let createdPost = transformPost(rezultOfPostSave);

		const user = await User.findById(req.userId);

		if (!user) {
			throw new HttpError(404, 'User not found');
		}

		user.createdPosts.push(post);

		await user.save();

		return createdPost;
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = createPost;
