import { scrollToTop } from '@helpers/Utils';
import React, { useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import Button from './Button';
import ArrowUpSvg from './SVG/ArrowUpSvg';

const BackToTopButton: React.FC = () => {
	const [isBttbShow, setBttbShow] = useState<boolean>();

	window.addEventListener('scroll', () =>
		setBttbShow(window.pageYOffset > 300)
	);

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
