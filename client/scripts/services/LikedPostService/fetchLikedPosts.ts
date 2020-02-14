import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchLikedPosts(token: string) {
	const requestBody: IRequestBody = {
		query: `
            query {
                likedPosts {
                    _id
                    created
                    post {
                        title
                        text
                        created
                        updated
                        creator {
                            username
                        }
                    }
                }
            }
        `
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { likedPosts } }) => {
			if (likedPosts) {
				return likedPosts;
			} else {
				const error: Array<Error> = [
					new Error('There are no liked posts')
				];
				throw error;
			}
		}
	);
}
