import checkJSON from './checkJSON';

export default function processJSON(res: Response) {
	if (checkJSON(res)) {
		return res.json();
	}

	const errors: Array<Error> = [new Error('Your JSON is not correct!')];
	throw errors;
}
