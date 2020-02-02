const User = require('../../../models/user'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const unfollowUser = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		if (req.userId === args.userId) {
			throw new HttpError(400, "You can't unFollow yourself");
		}

		const yourUser = await User.findById(req.userId);

		if (!yourUser) {
			throw new HttpError(404, 'Your user not found');
		}

		const user = await User.findById(args.userId);

		if (!user) {
			throw new HttpError(404, 'User you try to unfollow not found');
		}

		const userIndexInYourFollowing = yourUser.following.indexOf(
			args.userId
		);
		const userIndexInYourFriends = yourUser.friends.indexOf(args.userId);

		if (userIndexInYourFollowing === -1 && userIndexInYourFriends === -1) {
			throw new HttpError(400, `You don't follow ${user.username}`);
		}

		let subscriberType;

		if (userIndexInYourFollowing !== -1) {
			yourUser.following.splice(userIndexInYourFollowing, 1);
			user.followers.splice(user.followers.indexOf(yourUser._id), 1);

			subscriberType = 'unknown';
		}

		if (userIndexInYourFriends !== -1) {
			yourUser.friends.splice(userIndexInYourFriends, 1);
			yourUser.followers.push(user);

			user.friends.splice(user.friends.indexOf(yourUser._id), 1);
			user.following.push(yourUser);

			subscriberType = 'follower';
		}

		await yourUser.save();
		await user.save();

		return { user, subscriberType };
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = unfollowUser;
