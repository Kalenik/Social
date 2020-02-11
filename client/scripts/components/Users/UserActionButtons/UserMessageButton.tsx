import EmailButton from '@components/Buttons/SvgButtons/EmailButton';
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
		<EmailButton className={className} onClick={onClick} />
	);

	return (
		<MessageSender
			sendMessageControl={sendMessageControl}
			receiverName={receiverName}
		/>
	);
};

export default UserMessageButton;
