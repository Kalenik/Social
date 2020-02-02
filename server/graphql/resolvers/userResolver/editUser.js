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

		const editUser = args.editUserInput;

		if (!editUser.username) {
			throw new HttpError(400, 'Username is a required');
		}

		if (!editUser.email) {
			throw new HttpError(400, 'Email is a required');
		}

		if (editUser.username !== user.username) {
			const foundUserByName = await User.findOne({
				username: editUser.username
			});

			if (foundUserByName) {
				throw new HttpError(
					400,
					'User with this Username alredy exists'
				);
			}

			user.username = editUser.username;
		}

		if (editUser.email !== user.email) {
			const foundUserByEmail = await User.findOne({
				email: editUser.email
			});

			if (foundUserByEmail) {
				throw new HttpError(400, 'User with this Email alredy exists');
			}

			user.email = editUser.email;
		}

		if (editUser.currentPassword) {
			const isCurrentPasswordCorrect = await bcrypt.compare(
				editUser.currentPassword,
				user.password
			);

			if (!isCurrentPasswordCorrect) {
				throw new HttpError(400, 'Current Password is incorrect!');
			}

			const hashedNewPassword = await bcrypt.hash(
				editUser.newPassword,
				12
			);

			user.password = hashedNewPassword;
		}

		if (editUser.city !== user.city) {
			user.city = editUser.city;
		}

		if (editUser.extraInfo !== user.extraInfo) {
			user.extraInfo = editUser.extraInfo;
		}

		const rezultOfUserSave = await user.save();

		return transformUser(rezultOfUserSave);
	} catch (error) {
		log.error(error);
		res.handleGraphqlError(error);
	}
};

module.exports = editUser;
