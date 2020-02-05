import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
	<div className='home-page'>
		<div className='home-page__intro-text'>
			<p className='home-page__sign-up-text'>
				<Link to='/signup'>Sign up</Link> to start sharing your posts
				and chatting with friends.
			</p>
			<p>
				Have an account? <Link to='/signin'>Sign in</Link>
			</p>
		</div>
	</div>
);

export default Home;
