const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	isViewed: {
		type: Boolean,
		default: false
	},
	messages: [
		{
			messageText: {
				type: String
			},
			created: {
				type: Date,
				default: new Date()
			},
			updated: {
				type: Date,
				default: new Date()
			}
		}
	]
});

module.exports = mongoose.model('Message', messageSchema);
