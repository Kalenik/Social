const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	city: {
		type: String
	},
	extraInfo: {
		type: String
	},
	profileImgSrc: {
		type: String
	},
	createdPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	tokenVersion: {
		type: Number,
		require: true,
		default: 0
	}
});

module.exports = mongoose.model('User', userSchema);
