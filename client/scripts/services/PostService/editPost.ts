import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function editPost(
	token: string,
	postId: string,
	title: string,
	text: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation EditPost($postId:ID!, $title: String!, $text: String!) {
                editPost(editPostInput: { postId: $postId, title: $title, text: $text}) {
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
		variables: { postId, title, text }
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { editPost } }) => {
			if (editPost) {
				return editPost;
			} else {
				const error: Array<Error> = [new Error('Failed to edit post')];
				throw error;
			}
		}
	);
}
