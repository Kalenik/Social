const lastMessagesData = require('./lastMessagesData'),
	messagesData = require('./messagesData'),
	sendMessage = require('./sendMessage'),
	editMessage = require('./editMessage'),
	deleteMessage = require('./deleteMessage'),
	usernamesWithUnviewedMessagesCount = require('./usernamesWithUnviewedMessagesCount'),
	messagesViewed = require('./messagesViewed');

module.exports = {
	lastMessagesData,
	messagesData,
	sendMessage,
	editMessage,
	deleteMessage,
	usernamesWithUnviewedMessagesCount,
	messagesViewed
};
