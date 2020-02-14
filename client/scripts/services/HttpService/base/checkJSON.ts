export default function checkJSON(res: Response): boolean {
	const contentType = res.headers.get('content-type');

	return contentType && contentType.indexOf('application/json') !== -1
		? true
		: false;
}
