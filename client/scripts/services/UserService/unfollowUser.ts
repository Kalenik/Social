import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function unfollowUser(token: string, userId: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation UnfollowUser($id: ID!) {
                unfollowUser(userId:$id) {
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
				unfollowUser: {
					user: { username },
					subscriberType
				}
			}
		}) => {
			if (username && subscriberType) {
				return { username, subscriberType };
			} else {
				const error: Array<Error> = [
					new Error('Unfollow User is failed')
				];
				throw error;
			}
		}
	);
}
