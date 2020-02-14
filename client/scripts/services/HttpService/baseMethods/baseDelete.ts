import IRequestOptions from '@interfaces/IRequestOptions';
import baseRequest from '../base/baseRequest';

export default function baseDelete(
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<Response> {
	return baseRequest('DELETE', url, options, token);
}
