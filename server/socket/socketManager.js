const socketManager = (io, userSocketIds) => {
	io.on('connection', socket => {
		socket.on('user_connected', username => {
			const socketId = socket.id;

			userSocketIds[username] = socketId;

			socket.broadcast.emit('user_connected', username);
			io.to(socketId).emit(
				'connected_usernames',
				Object.keys(userSocketIds)
			);
		});

		socket.on('user_logout', () => {
			for (var username in userSocketIds) {
				if (userSocketIds[username] === socket.id) {
					socket.broadcast.emit('user_logout', username);
					delete userSocketIds[username];
				}
			}
		});

		socket.on('disconnect', () => {
			for (var username in userSocketIds) {
				if (userSocketIds[username] === socket.id) {
					socket.broadcast.emit('user_disconnected', username);
					delete userSocketIds[username];
				}
			}
		});

		socket.on('user-typing', ({ isTyping, senderName, receiverName }) => {
			const receiverSocketId = userSocketIds[receiverName];

			io.to(receiverSocketId).emit('user-typing', {
				isTyping,
				senderName
			});
		});
	});
};

module.exports = socketManager;
