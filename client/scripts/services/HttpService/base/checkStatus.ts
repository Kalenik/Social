import IErrorResponse from '@interfaces/IErrorResponse';
import checkJSON from './checkJSON';
import processErrorResponse from './processErrorResponse';
import processJSON from './processJSON';

export default function checkStatus(res: Response) {
	if (!res) {
		const errors: Array<Error> = [new Error('Server does not work')];
		throw errors;
	}

	if (!res.ok && res.status !== 200 && res.status !== 201) {
		if (res.status === 500 || res.status > 500) {
			const errors: Array<Error> = [new Error('Server Error')];
			throw errors;
		}

		if (checkJSON(res)) {
			return processJSON(res).then((errResData: IErrorResponse) => {
				throw processErrorResponse(errResData);
			});
		}

		const errors: Array<Error> = [new Error(res.statusText)];
		throw errors;
	}

	return res;
}
