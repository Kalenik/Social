const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: new Date()
	},
	updated: {
		type: Date,
		required: true,
		default: new Date()
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Post', postSchema);
