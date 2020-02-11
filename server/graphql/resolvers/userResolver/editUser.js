const bcrypt = require('bcryptjs'),
	User = require('../../../models/user'),
	{ transformUser } = require('../common'),
	log = require('../../../helpers/logger/log')(module.filename),
	HttpError = require('../../../error/HttpError');

const editUser = async (args, { req, res }) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const user = await User.findById(req.userId);

		if (!user) {
			throw new HttpError(404, "Can't update nonexistent User");
		}

		const editUserInput = args.editUserInput;

		if (!editUserInput.username) {
			throw new HttpError(400, 'Username is a required');
		}

		if (!editUserInput.email) {
			throw new HttpError(400, 'Email is a required');
		}

		if (editUserInput.username !== user.username) {
			const foundUserByName = await User.findOne({
				username: editUserInput.username
			});

			if (foundUserByName) {
				throw new HttpError(
					400,
					'User with this Username alredy exists'
				);
			}

			user.username = editUserInput.username;
		}

		if (editUserInput.email !== user.email) {
			const foundUserByEmail = await User.findOne({
				email: editUserInput.email
			});

			if (foundUserByEmail) {
				throw new HttpError(400, 'User with this Email alredy exists');
			}

			user.email = editUserInput.email;
		}

		if (editUserInput.currentPassword) {
			const isCurrentPasswordCorrect = await bcrypt.compare(
				editUserInput.currentPassword,
				user.password
			);

			if (!isCurrentPasswordCorrect) {
				throw new HttpError(400, 'Current Password is incorrect!');
			}

			const hashedNewPassword = await bcrypt.hash(
				editUserInput.newPassword,
				12
			);

			user.password = hashedNewPassword;
		}

		if (editUserInput.city !== user.city) {
			user.city = editUserInput.city;
		}

		if (editUserInput.extraInfo !== user.extraInfo) {
			user.extraInfo = editUserInput.extraInfo;
		}

		const rezultOfUserSave = await user.save();

		return transformUser(rezultOfUserSave);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = editUser;
