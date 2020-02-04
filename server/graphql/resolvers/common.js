const Post = require('../../models/post'),
	User = require('../../models/user'),
	log = require('../../helpers/logger/log')(module.filename);

const getUserById = async userId => {
	try {
		const user = await User.findById(userId);

		return {
			...user._doc,
			_id: user.id,
			createdPosts: getPosts.bind(null, user.createdPosts)
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

const getUsers = async userIds => {
	try {
		const users = await User.find({ _id: { $in: userIds } });

		return users.map(transformUser);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

const getPost = async postId => {
	try {
		const post = await Post.findById(postId);

		return transformPost(post);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

const getPosts = async postIds => {
	try {
		const posts = await Post.find({ _id: { $in: postIds } });

		return posts.map(transformPost);
	} catch (err) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

const transformUser = user => ({
	...user._doc,
	_id: user.id,
	friends: getUsers.bind(null, user.friends),
	following: getUsers.bind(null, user.following),
	followers: getUsers.bind(null, user.followers),
	createdPosts: getPosts.bind(null, user.createdPosts)
});

const transformPost = post => ({
	...post._doc,
	_id: post.id,
	creator: getUserById.bind(this, post.creator)
});

const transformLikedPost = likedPost => ({
	...likedPost._doc,
	_id: likedPost.id,
	post: getPost.bind(this, likedPost.post),
	user: getUserById.bind(this, likedPost.user)
});

module.exports = {
	transformUser,
	transformPost,
	transformLikedPost
};
