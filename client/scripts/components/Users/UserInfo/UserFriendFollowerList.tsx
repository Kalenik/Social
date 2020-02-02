import IUser from '@interfaces/IUser';
import React from 'react';
import { Link } from 'react-router-dom';

interface IUserFriendFollowerListProps {
	username: string;
	friends?: Array<IUser>;
	following?: Array<IUser>;
	followers?: Array<IUser>;
}

const UserFriendFollowerList: React.FC<IUserFriendFollowerListProps> = ({
	username,
	friends = [],
	following = [],
	followers = []
}) => {
	const lengthList: { [key: string]: number } = {
		friends: friends.length || 0,
		following: following.length || 0,
		followers: followers.length || 0
	};

	return (
		<ul className='user-page__friend-follower-list'>
			{['friends', 'following', 'followers'].map(link => (
				<li className='user-page__friend-follower-item' key={link}>
					<Link
						className='user-page__friend-follower-link'
						to={`/user/${username}/${link}`}
					>
						{`${lengthList[link]} ${link}`}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default UserFriendFollowerList;
