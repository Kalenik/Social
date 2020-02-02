import Button from '@components/Button';
import MessageSender from '@components/Messages/MessageSender';
import React from 'react';

interface IUserMessageButtonProps {
	receiverName: string;
	className?: string;
}

const UserMessageButton: React.FC<IUserMessageButtonProps> = ({
	receiverName,
	className
}) => {
	const sendMessageControl = (onClick: () => void): JSX.Element => (
		<Button className={className} onClick={onClick}>
			Write Message
		</Button>
	);

	return (
		<MessageSender
			sendMessageControl={sendMessageControl}
			receiverName={receiverName}
		/>
	);
};

export default UserMessageButton;
