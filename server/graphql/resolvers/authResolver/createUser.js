const bcrypt = require('bcryptjs'),
	User = require('../../../models/user'),
	createAccessToken = require('../../../helpers/auth/createAccessToken'),
	createRefreshToken = require('../../../helpers/auth/createRefreshToken'),
	sendRefreshToken = require('../../../helpers/auth/sendRefreshToken'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const createUser = async (args, { res }) => {
	try {
		const newUser = args.createUserInput;

		const foundUserByName = await User.findOne({
			username: newUser.username
		});

		if (foundUserByName) {
			throw new HttpError(400, 'User with this Username alredy exists');
		}

		const foundUserByEmail = await User.findOne({
			email: newUser.email
		});

		if (foundUserByEmail) {
			throw new HttpError(400, 'User with this Email alredy exists');
		}

		const hashedPassword = await bcrypt.hash(newUser.password, 12);

		const user = new User({
			username: newUser.username,
			email: newUser.email,
			password: hashedPassword
		});

		const rezultOfUserSave = await user.save();

		sendRefreshToken(res, createRefreshToken(rezultOfUserSave));

		return {
			user: transformUser(rezultOfUserSave),
			accessToken: createAccessToken(rezultOfUserSave),
			tokenExpiration: 15 // 15 min
		};
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = createUser;
