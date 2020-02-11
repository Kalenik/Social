import { scrollToTop, throttle } from '@helpers/Utils';
import React, { useEffect, useState } from 'react';
import AnimationWrapper from '../AnimationWrapper';
import ArrowUpButton from './SvgButtons/ArrowUpButton';

const BackToTopButton: React.FC = () => {
	const [isBttbShow, setBttbShow] = useState<boolean>();

	useEffect(() => {
		window.addEventListener(
			'scroll',
			throttle(() => setBttbShow(window.pageYOffset > 300), 400)
		);
	}, []);

	return (
		<AnimationWrapper
			dependence={isBttbShow}
			className='bttb__animation-wrapper'
			fadeOutAnimationName='fade-out-bttb'
		>
			<ArrowUpButton className='bttb' onClick={scrollToTop} />
		</AnimationWrapper>
	);
};

export default BackToTopButton;
