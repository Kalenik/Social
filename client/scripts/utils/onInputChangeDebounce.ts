export default function onInputChangeDebounce(
	handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
	ms: number
) {
	let timeout: number;

	return function(e: React.ChangeEvent<HTMLInputElement>) {
		e.persist();

		clearTimeout(timeout);

		timeout = window.setTimeout(() => handler(e), ms);
	};
}
