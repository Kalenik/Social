export default interface IGraphQLErrorResponse {
	data?: any;
	errors: Array<IGraphQLError | Error>;
}

export interface IGraphQLError {
	message: string;
	locations?: Array<{ line: number; column: number }>;
	stack?: Array<string>;
	path?: Array<string>;
}
