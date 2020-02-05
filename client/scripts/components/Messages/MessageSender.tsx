import SendMessageTextarea from '@components/Forms/SendMessageTextarea';
import Modal from '@components/Modal';
import AuthContext, { IAuthContext } from '@contexts/authContext';
import LoadingContext from '@contexts/loadingContext';
import NoticeContext from '@contexts/noticeContext';
import {
	addErrorNoticesActionCreator,
	addSuccessNoticesActionCreator
} from '@reducers/NoticesReducer/NoticeActionCreators';
import MessageService from '@services/MessageService';
import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';

interface IMessageSenderProps {
	receiverName: string;
	sendMessageControl: (onClick: () => void) => JSX.Element;
}

const MessageSender: React.FC<IMessageSenderProps> = ({
	receiverName,
	sendMessageControl
}) => {
	const { token } = useContext<IAuthContext>(AuthContext),
		noticeContextDispatch = useContext(NoticeContext),
		setLoading = useContext(LoadingContext),
		[isModalOpen, setModal] = useState<boolean>(false),
		[canCloseModal, setCloseModal] = useState(false),
		{ register, errors, handleSubmit } = useForm();

	const sendMessageHandler = (): void => setModal(true);
	const modalCancelHandler = (): void => setModal(false);

	const modalConfirmHandler = handleSubmit(({ message }) => {
		setLoading(true);

		MessageService.sendMessage(token, receiverName, message)
			.then(() => {
				noticeContextDispatch(
					addSuccessNoticesActionCreator(`Message is sent`)
				);
			})
			.catch(err =>
				noticeContextDispatch(addErrorNoticesActionCreator(err))
			)
			.then(() => {
				setCloseModal(true);
				setLoading(false);
			});
	});

	return token ? (
		<>
			{isModalOpen && (
				<Modal
					canCloseModal={canCloseModal}
					setCloseModal={setCloseModal}
					title='Write message'
					onCancel={modalCancelHandler}
					onConfirm={modalConfirmHandler}
					confirmText='Send'
				>
					<SendMessageTextarea
						receiverName={receiverName}
						register={register}
						errors={errors}
						sendMessageHandler={modalConfirmHandler}
					/>
				</Modal>
			)}

			{sendMessageControl(sendMessageHandler)}
		</>
	) : null;
};

export default MessageSender;