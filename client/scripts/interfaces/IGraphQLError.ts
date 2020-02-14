export default interface IGraphQLError {
	message: string;
	locations?: Array<{ line: number; column: number }>;
	stack?: Array<string>;
	path?: Array<string>;
}
