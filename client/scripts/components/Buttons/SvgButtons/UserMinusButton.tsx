import UserMinusSvg from '@components/SVG/UserMinusSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IUserMinusButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const UserMinusButton: React.FC<IUserMinusButton> = props => (
	<SvgButton {...props}>
		<UserMinusSvg className='svg-btn__user-minus' />
	</SvgButton>
);

export default UserMinusButton;
