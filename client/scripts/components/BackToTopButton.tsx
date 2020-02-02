import { scrollToTop } from '@helpers/Utils';
import React, { useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import Button from './Button';

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
			<Button className='btn bttb' onClick={scrollToTop} />
		</AnimationWrapper>
	);
};

export default BackToTopButton;
