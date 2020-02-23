const config = require('config'),
	cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: config.get('cloudinary.cloudName'),
	api_key: config.get('cloudinary.apiKey'),
	api_secret: config.get('cloudinary.apiSecret')
});

module.exports = function(req, res, next) {
	req.uploadFileToCloudinary = async (file, publicId, folder) => {
		try {
			return await cloudinary.uploader.upload(file, {
				public_id: publicId,
				folder
			});
		} catch (error) {
			throw new HttpError(400, error.message);
		}
	};

	req.deleteFileFromCloudinary = async publicId => {
		try {
			return await cloudinary.uploader.destroy(publicId);
		} catch (error) {
			throw new HttpError(error.http_code, error.message);
		}
	};

	next();
};
