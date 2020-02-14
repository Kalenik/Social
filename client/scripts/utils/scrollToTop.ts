export default function scrollToTop(): void {
	const scrollStepInPx = 100,
		delayInMs = 30;
	let timerId: number;

	const scrollStep = (): void => {
		window.pageYOffset === 0 && clearInterval(timerId);
		window.scroll(0, window.pageYOffset - scrollStepInPx);
	};

	timerId = window.setInterval(scrollStep, delayInMs);
}
