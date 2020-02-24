const config = require('config'),
	express = require('express'),
	router = express.Router(),
	getMimeStringFromDataURL = require('../utils/getMimeStringFromDataURL'),
	getPublicIdFromUrl = require('../utils/getPublicIdFromUrl'),
	User = require('../models/user'),
	log = require('../helpers/logger/log')(module.filename),
	HttpError = require('../error/HttpError'),
	avatarsFolder = config.get('cloudinary.avatarsFolder');

router.post('/upload', async (req, res, next) => {
	try {
		if (!req.isAuth) {
			throw new HttpError(401);
		}

		const user = await User.findById(req.userId);

		if (!user) {
			throw new HttpError(404, "Can't update nonexistent User");
		}

		const avatarImgDataURL = req.body.avatarImgDataURL;

		if (
			['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].indexOf(
				getMimeStringFromDataURL(avatarImgDataURL)
			) === -1
		) {
			throw new HttpError(400, 'Only images are allowed');
		}

		if (avatarImgDataURL.size > 1 * 1024 * 1024) {
			throw new HttpError(400, 'File must be less than 1MB');
		}

		if (user.profileImgSrc) {
			await req.deleteFileFromCloudinary(
				getPublicIdFromUrl(user.profileImgSrc, avatarsFolder)
			);
		}

		const rezultOfUploadImg = await req.uploadFileToCloudinary(
			avatarImgDataURL,
			`${user._id}_${Date.now()}`,
			avatarsFolder
		);

		user.profileImgSrc = rezultOfUploadImg.secure_url;

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

		await req.deleteFileFromCloudinary(
			getPublicIdFromUrl(user.profileImgSrc, avatarsFolder)
		);

		user.profileImgSrc = '';

		await user.save();

		res.send(true);
	} catch (error) {
		log.error(error);
		next(error);
	}
});

module.exports = router;
