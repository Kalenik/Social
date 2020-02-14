import HttpMethodType from '@interfaces/HttpMethodType';
import IRequestOptions from '@interfaces/IRequestOptions';
import checkStatus from './checkStatus';
import prepareHeaders from './prepareHeaders';

export default function baseRequest(
	method: HttpMethodType,
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<Response> {
	options.method = method;
	options.headers = prepareHeaders(options.headers, token);

	return fetch(url, options)
		.catch(err => {
			console.log(err);
			const errors: Array<Error> = [new Error('Failed to fetch')];
			throw errors;
		})
		.then(checkStatus);
}
