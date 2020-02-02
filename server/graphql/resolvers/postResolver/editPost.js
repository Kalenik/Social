const Post = require('../../../models/post'),
	{ transformPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const editPost = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const editPostInput = args.editPostInput;

		const post = await Post.findById(editPostInput.postId);

		if (!post) {
			throw new HttpError(404, "Can't update nonexistent post");
		}

		if (editPostInput.title !== post.title) {
			post.title = editPostInput.title;
		}

		if (editPostInput.text !== post.text) {
			post.text = editPostInput.text;
		}

		post.updated = Date.now();

		const rezultOfPostSave = await post.save();

		return transformPost(rezultOfPostSave);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = editPost;
