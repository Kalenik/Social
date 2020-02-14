import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function likePost(token: string, postId: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation LikePost($postId: ID!) {
                likePost(postId: $postId) {
                    _id
                    post {
                        title
                    }
                }
            }
        `,
		variables: {
			postId
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { likePost } }) => {
			if (likePost) {
				return likePost;
			} else {
				const error: Array<Error> = [new Error('Failed to like post')];
				throw error;
			}
		}
	);
}
