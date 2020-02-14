import IGraphQLError from './IGraphQLError';

export default interface IErrorResponse {
	data?: any;
	errors: Array<IGraphQLError | Error>;
}
