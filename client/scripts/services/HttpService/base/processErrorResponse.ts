import IErrorResponse from '@interfaces/IErrorResponse';
import IGraphQLError from '@interfaces/IGraphQLError';

export default function processErrorResponse(
	errData: IErrorResponse
): Array<Error> {
	return errData && errData.errors
		? errData.errors.map(
				(error: IGraphQLError | Error) => new Error(error.message)
		  )
		: [new Error('Server Error')];
}
