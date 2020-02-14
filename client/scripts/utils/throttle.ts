export default function throttle(func: (...args: any[]) => any, ms: number) {
	let isThrottled = false,
		savedArgs: any;

	function wrapper(...wrapperArgs: any[]) {
		if (isThrottled) {
			savedArgs = arguments;
			return;
		}

		func(wrapperArgs);

		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;

			if (savedArgs) {
				wrapper(savedArgs);
				savedArgs = null;
			}
		}, ms);
	}

	return wrapper;
}
