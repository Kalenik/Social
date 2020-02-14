export default function prepareHeaders(
	headers?: Headers,
	token?: string
): Headers {
	const preparedHeaders = headers ? headers : new Headers();

	if (token) {
		preparedHeaders.append('Authorization', 'Bearer ' + token);
	}

	return preparedHeaders;
}
