import EmailSvg from '@components/SVG/EmailSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IEmailButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const EmailButton: React.FC<IEmailButton> = props => (
	<SvgButton {...props}>
		<EmailSvg className='svg-btn__email' />
	</SvgButton>
);

export default EmailButton;
