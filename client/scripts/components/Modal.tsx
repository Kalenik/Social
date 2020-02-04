import React from 'react';
import { RemoveScroll } from 'react-remove-scroll'; /* wraped content is scrollable, everything else is not. */
import Backdrop from './Backdrop';
import Button from './Button';
import CloseButton from './CloseButton';

interface IModalProps {
	canCloseModal: boolean;
	setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
	children: React.ReactNode;
	actions?: JSX.Element;
	onCancel: () => void;
	onConfirm?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	confirmText?: string;
}

const Modal: React.FC<IModalProps> = ({
	canCloseModal,
	setCloseModal,
	title,
	children,
	actions,
	onCancel,
	onConfirm,
	confirmText = 'Submit'
}) => {
	const closeModalWithAnimation = () => setCloseModal(true);

	const hideModal = (e: React.AnimationEvent<HTMLDivElement>) => {
		if (e.animationName === 'fade-out-modal') {
			onCancel();
			setCloseModal(false);
		}
	};

	return (
		<RemoveScroll>
			<div className='modal__wrapper'>
				<div
					onAnimationEnd={hideModal}
					className={canCloseModal ? 'modal modal_close' : 'modal'}
				>
					<header className='modal__header'>
						<h1>{title}</h1>
						<CloseButton click={closeModalWithAnimation} />
					</header>
					<section className='modal__content'>{children}</section>
					<section className='modal__actions'>
						{actions
							? actions
							: onConfirm && (
									<Button onClick={onConfirm}>
										{confirmText}
									</Button>
							  )}
					</section>
				</div>
				<Backdrop
					isCloseAnimation={canCloseModal}
					click={closeModalWithAnimation}
				/>
			</div>
		</RemoveScroll>
	);
};

export default Modal;
