const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likedPostSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		required: true,
		default: new Date()
	}
});

module.exports = mongoose.model('likedPost', likedPostSchema);
