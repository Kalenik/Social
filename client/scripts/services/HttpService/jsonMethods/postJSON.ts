import IRequestOptions from '@interfaces/IRequestOptions';
import baseJSONRequest from '../base/baseJSONRequest';

export default function postJSON(
	url: string,
	options: IRequestOptions = {},
	token?: string
): Promise<any> {
	return baseJSONRequest('POST', url, options, token);
}
