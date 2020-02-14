import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function deletePost(token: string, postId: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation DeletePost($postId: ID!) {
                deletePost(postId: $postId)
            }
        `,
		variables: { postId }
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { deletePost } }) => {
			if (deletePost) {
				return true;
			} else {
				const error: Array<Error> = [
					new Error('Failed to delete post')
				];
				throw error;
			}
		}
	);
}
