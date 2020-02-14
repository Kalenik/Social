import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchUserSubscribers(
	userName: string,
	subscribersType: string
) {
	const requestBody: IRequestBody = {
		query: `
            query User($userName:String!) {
                user(userName:$userName) {
                    ${subscribersType} {
                        _id
                        username
                        email
                        profileImgSrc
                    }
                }
            }
        `,
		variables: {
			userName
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options).then(({ data: { user } }) => {
		if (user[subscribersType]) {
			return user[subscribersType];
		} else {
			const error: Array<Error> = [
				new Error(
					`${subscribersType[0].toUpperCase() +
						subscribersType.slice(1)} not found`
				)
			];
			throw error;
		}
	});
}
