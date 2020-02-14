import IRequestOptions from '@interfaces/IRequestOptions';
import baseRequest from '../base/baseRequest';

export default function basePost(
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<Response> {
	return baseRequest('POST', url, options, token);
}
