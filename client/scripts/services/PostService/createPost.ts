import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function createPost(token: string, title: string, text: string) {
	const requestBody: IRequestBody = {
		query: `
            mutation CreatePost($title: String!, $text: String!) {
                createPost(title: $title, text: $text) {
                    _id
                    title
                    text
                    created
                    updated
                    creator {
                        _id
                        username
                    }
                }
            }
        `,
		variables: { title, text }
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { createPost } }) => {
			if (createPost) {
				return createPost;
			} else {
				const error: Array<Error> = [
					new Error('Failed to create post')
				];
				throw error;
			}
		}
	);
}
