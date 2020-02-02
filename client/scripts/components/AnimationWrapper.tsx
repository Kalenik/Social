import React, { useEffect, useState } from 'react';

interface IAnimationWrapperProps {
	children: React.ReactChild;
	dependence: any;
	className: string;
	fadeOutAnimationName: string;
}

const AnimationWrapper: React.FC<IAnimationWrapperProps> = ({
	children,
	dependence,
	className,
	fadeOutAnimationName
}) => {
	const [animationWrapperClass, setAnimationWrapperClass] = useState(
		`${className} ${className}_hidden`
	);

	const animationEndHandler = (
		e: React.AnimationEvent<HTMLDivElement>
	): void => {
		e.animationName === fadeOutAnimationName &&
			setAnimationWrapperClass(`${className} ${className}_hidden`);
	};

	useEffect(() => {
		setAnimationWrapperClass(prevClass => {
			if (dependence) {
				if (prevClass !== className) {
					return className;
				}
			} else {
				if (prevClass === className) {
					return `${className} ${className}_hide`;
				}
			}

			return prevClass;
		});
	}, [dependence]);

	return (
		<div
			className={animationWrapperClass}
			onAnimationEnd={animationEndHandler}
		>
			{animationWrapperClass !== `${className} ${className}_hidden` &&
				children}
		</div>
	);
};

export default AnimationWrapper;
