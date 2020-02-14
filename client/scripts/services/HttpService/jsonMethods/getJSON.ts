import IRequestOptions from '@interfaces/IRequestOptions';
import baseJSONRequest from '../base/baseJSONRequest';

export default function getJSON(
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<any> {
	return baseJSONRequest('GET', url, options, token);
}
