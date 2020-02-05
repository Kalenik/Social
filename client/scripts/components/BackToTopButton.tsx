import { scrollToTop, throttle } from '@helpers/Utils';
import React, { useEffect, useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import Button from './Button';
import ArrowUpSvg from './SVG/ArrowUpSvg';

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
			<Button className='btn bttb' onClick={scrollToTop}>
				<ArrowUpSvg className='bttb__arrow-up' />
			</Button>
		</AnimationWrapper>
	);
};

export default BackToTopButton;
