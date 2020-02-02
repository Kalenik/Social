const Post = require('../../../models/post'),
	{ transformPost } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename);

const posts = async () => {
	try {
		const posts = await Post.find();

		return posts.map(transformPost);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = posts;
