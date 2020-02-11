import UserPlusSvg from '@components/SVG/UserPlusSvg';
import React from 'react';
import SvgButton from './SvgButton';

interface IUserPlusButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const UserPlusButton: React.FC<IUserPlusButton> = props => (
	<SvgButton {...props}>
		<UserPlusSvg className='svg-btn__user-plus' />
	</SvgButton>
);

export default UserPlusButton;
