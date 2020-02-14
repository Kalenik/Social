import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function deleteLikedPost(token: string, likedPostId: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation DeleteLikedPost($likedPostId: ID!) {
                deleteLikedPost(likedPostId: $likedPostId) {
                    title
                }
            }
        `,
		variables: {
			likedPostId
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { deleteLikedPost } }) => {
			if (deleteLikedPost) {
				return deleteLikedPost;
			} else {
				const error: Array<Error> = [
					new Error('Failed to delete liked post')
				];
				throw error;
			}
		}
	);
}
