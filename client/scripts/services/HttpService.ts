import IErrorResponse, { IGraphQLError } from '@interfaces/IErrorResponse';

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export default class HttpService {
	private static checkStatus(res: Response) {
		if (!res) {
			const errors: Array<Error> = [new Error('Server does not work')];
			throw errors;
		}

		if (!res.ok && res.status !== 200 && res.status !== 201) {
			if (res.status === 500 || res.status > 500) {
				const errors: Array<Error> = [new Error('Server Error')];
				throw errors;
			}

			if (this.checkJSON(res)) {
				return this.processJSON(res).then(
					(errResData: IErrorResponse) => {
						throw this.processErrorResponse(errResData);
					}
				);
			}

			const errors: Array<Error> = [new Error(res.statusText)];
			throw errors;
		}

		return res;
	}

	private static processErrorResponse = (
		errData: IErrorResponse
	): Array<Error> =>
		errData && errData.errors
			? errData.errors.map(
					(error: IGraphQLError | Error) => new Error(error.message)
			  )
			: [new Error('Server Error')];

	private static processJSON(res: Response) {
		if (HttpService.checkJSON(res)) {
			return res.json();
		}

		const errors: Array<Error> = [new Error('Your JSON is not correct!')];
		throw errors;
	}

	private static checkJSON(res: Response): boolean {
		const contentType = res.headers.get('content-type');

		return contentType && contentType.indexOf('application/json') !== -1
			? true
			: false;
	}

	private static prepareHeaders(token?: string): Headers {
		const headers = new Headers();

		if (token) {
			headers.append('Authorization', 'Bearer ' + token);
		}

		return headers;
	}

	private static prepareJSONHeaders(token?: string): Headers {
		const headers = this.prepareHeaders(token);
		headers.append('Content-Type', 'application/json');
		return headers;
	}

	private static baseRequest(
		method: HttpMethod,
		url: string,
		options: RequestInit = {},
		token?: string
	): Promise<Response> {
		options.method = method;
		options.headers = this.prepareHeaders(token);

		return fetch(url, options)
			.catch(err => {
				console.log(err);
				const errors: Array<Error> = [new Error('Failed to fetch')];
				throw errors;
			})
			.then(this.checkStatus.bind(this));
	}

	private static baseJSONRequest(
		method: HttpMethod,
		url: string,
		options: RequestInit = {},
		token?: string
	): Promise<any> {
		options.method = method;
		options.headers = this.prepareJSONHeaders(token);

		return fetch(url, options)
			.catch(err => {
				console.log(err);
				const errors: Array<Error> = [new Error('Failed to fetch')];
				throw errors;
			}) // important that this catch was here
			.then(this.checkStatus.bind(this))
			.then(this.processJSON.bind(this));
	}

	public static post(
		url: string,
		options: RequestInit = {},
		token?: string
	): Promise<Response> {
		return this.baseRequest('POST', url, options, token);
	}

	public static postJSON(
		url: string,
		options: RequestInit = {},
		token?: string
	): Promise<any> {
		return this.baseJSONRequest('POST', url, options, token);
	}

	public static getJSON(
		url: string,
		options: RequestInit = {},
		token?: string
	): Promise<any> {
		return this.baseJSONRequest('GET', url, options, token);
	}
}
