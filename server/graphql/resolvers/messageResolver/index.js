const lastMessagesData = require('./lastMessagesData'),
	messagesData = require('./messagesData'),
	sendMessage = require('./sendMessage'),
	editMessage = require('./editMessage'),
	deleteMessage = require('./deleteMessage'),
	usernamesWithUnviewedMessages = require('./usernamesWithUnviewedMessages'),
	messagesViewed = require('./messagesViewed');

module.exports = {
	lastMessagesData,
	messagesData,
	sendMessage,
	editMessage,
	deleteMessage,
	usernamesWithUnviewedMessages,
	messagesViewed
};
