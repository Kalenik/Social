import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function baseAuthRequest(
	methodName: string /* name of GraphQL method */,
	requestBody: IRequestBody
) {
	const options = {
		body: JSON.stringify(requestBody),
		credentials: 'include' as RequestCredentials
	};

	return postJSON(Config.graphqlPath, options).then(
		({
			data: {
				[methodName]: { user, accessToken, tokenExpiration }
			}
		}) => {
			if (user._id && user.username && accessToken && tokenExpiration) {
				return {
					user,
					accessToken,
					tokenExpiration
				};
			} else {
				const error: Array<Error> = [
					new Error(`${methodName} is failed`)
				];
				throw error;
			}
		}
	);
}
