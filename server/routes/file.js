const express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	{ promisify } = require('util'),
	User = require('../models/user'),
	log = require('../helpers/logger/log')(module.filename),
	HttpError = require('../error/HttpError');

const deleteFile = path => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

router.post('/upload', async (req, res, next) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const user = await User.findById(req.userId);

		if (!user) {
			throw new HttpError(404, "Can't update nonexistent User");
		}

		if (!req.files || Object.keys(req.files).length === 0) {
			throw new HttpError(400, 'No files were uploaded');
		}

		user.profileImgSrc &&
			deleteFile(`${__dirname}/../static${user.profileImgSrc}`);

		const avatarImg = req.files.avatarImg;

		const uploadFile = promisify(avatarImg.mv);

		if (
			!['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(
				avatarImg.mimetype
			)
		) {
			throw new HttpError(400, 'Only images are allowed');
		}

		if (avatarImg.size > 1 * 1024 * 1024) {
			throw new HttpError(400, 'File must be less than 1MB');
		}

		const avatarImageName = `${
			user._id
		}_${Date.now()}.${avatarImg.mimetype.split('/').pop()}`;

		await uploadFile(
			`${__dirname}/../downloads/${
				process.env.NODE_ENV === 'development'
					? 'development/images'
					: 'images'
			}/avatars/${avatarImageName}`
		);

		user.profileImgSrc = `/images/avatars/${avatarImageName}`;

		const rezultOfUserSave = await user.save();

		res.json({
			profileImgSrc: rezultOfUserSave.profileImgSrc
		});
	} catch (error) {
		log.error(error);
		next(error);
	}
});

router.delete('/delete', async (req, res, next) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const user = await User.findById(req.userId);

		if (!user) {
			throw new HttpError(404, "Can't update nonexistent User");
		}

		if (!user.profileImgSrc) {
			throw new HttpError(400, "You don't have Avatar");
		}

		deleteFile(`${__dirname}/../static${user.profileImgSrc}`);

		user.profileImgSrc = '';

		await user.save();

		res.send(true);
	} catch (error) {
		log.error(error);
		next(error);
	}
});

module.exports = router;
