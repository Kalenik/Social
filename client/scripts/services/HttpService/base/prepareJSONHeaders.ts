import prepareHeaders from './prepareHeaders';

export default function prepareJSONHeaders(
	headers?: Headers,
	token?: string
): Headers {
	const preparedJSONHeaders = prepareHeaders(headers, token);

	preparedJSONHeaders.append('Content-Type', 'application/json');

	return preparedJSONHeaders;
}
