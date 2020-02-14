import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function followUser(token: string, userId: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation FollowUser($id: ID!) {
                followUser(userId:$id) {
                    user {
                        username
                    }
                    subscriberType
                } 
            }
        `,
		variables: {
			id: userId
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({
			data: {
				followUser: {
					user: { username },
					subscriberType
				}
			}
		}) => {
			if (username && subscriberType) {
				return { username, subscriberType };
			} else {
				const error: Array<Error> = [
					new Error('Follow User is failed')
				];
				throw error;
			}
		}
	);
}
