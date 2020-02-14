import HttpMethodType from '@interfaces/HttpMethodType';
import IRequestOptions from '@interfaces/IRequestOptions';
import checkStatus from './checkStatus';
import prepareJSONHeaders from './prepareJSONHeaders';
import processJSON from './processJSON';

export default function baseJSONRequest(
	method: HttpMethodType,
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<any> {
	options.method = method;
	options.headers = prepareJSONHeaders(options.headers, token);

	return fetch(url, options)
		.catch(err => {
			console.log(err);
			const errors: Array<Error> = [new Error('Failed to fetch')];
			throw errors;
		}) // important that this catch was here
		.then(checkStatus)
		.then(processJSON);
}
