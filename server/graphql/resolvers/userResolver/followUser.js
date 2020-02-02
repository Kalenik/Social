const User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const followUser = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		if (req.userId === args.userId) {
			throw new HttpError(400, "You can't follow yourself");
		}

		const yourUser = await User.findById(req.userId);

		if (!yourUser) {
			throw new HttpError(404, 'Your user not found');
		}

		const user = await User.findById(args.userId);

		if (!user) {
			throw new HttpError(404, 'User you try to follow not found');
		}

		if (yourUser.following.indexOf(args.userId) !== -1) {
			throw new HttpError(
				400,
				`You are already following ${user.username}`
			);
		}

		if (yourUser.friends.indexOf(args.userId) !== -1) {
			throw new HttpError(
				400,
				`You are already friends with ${user.username}`
			);
		}

		let subscriberType;

		const userIndexInYourFollowers = yourUser.followers.indexOf(
			args.userId
		);

		if (userIndexInYourFollowers !== -1) {
			yourUser.followers.splice(userIndexInYourFollowers, 1);
			yourUser.friends.push(user);

			user.following.splice(user.following.indexOf(yourUser._id), 1);
			user.friends.push(yourUser);

			subscriberType = 'friend';
		} else {
			yourUser.following.push(user);
			user.followers.push(yourUser);

			subscriberType = 'following';
		}

		await yourUser.save();
		await user.save();

		return { user, subscriberType };
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = followUser;
