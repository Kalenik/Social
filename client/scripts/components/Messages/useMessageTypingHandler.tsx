import AuthContext, { IAuthContext } from '@contexts/authContext';
import SocketContext from '@contexts/socketContext';
import { useContext, useEffect } from 'react';

const useMessageTypingHandler = (receiverName: string) => {
	const { authUser } = useContext<IAuthContext>(AuthContext),
		{ socket } = useContext(SocketContext);

	let lastUpdateTime: number, typingIntervalId: number, isUserTyping: boolean;

	const emitUserTyping = (isTyping: boolean) => {
		socket!.emit('user-typing', {
			isTyping,
			senderName: authUser.username,
			receiverName
		});
	};

	const stopCheckingTyping = () => {
		if (typingIntervalId) {
			clearInterval(typingIntervalId);
			emitUserTyping(false);
		}
	};

	const startCheckingTyping = () => {
		typingIntervalId = window.setInterval(() => {
			if (Date.now() - lastUpdateTime > 400) {
				isUserTyping = false;
				stopCheckingTyping();
			}
		}, 400);
	};

	const onTypingHandler = (): void => {
		lastUpdateTime = Date.now();

		if (!isUserTyping) {
			isUserTyping = true;
			emitUserTyping(true);
			startCheckingTyping();
		}
	};

	useEffect(() => {
		return () => {
			stopCheckingTyping();
		};
	}, []);

	return onTypingHandler;
};

export default useMessageTypingHandler;
