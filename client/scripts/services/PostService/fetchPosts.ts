import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchPosts() {
	const requestBody: IRequestBody = {
		query: `
            query {
                posts {
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
        `
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options).then(({ data: { posts } }) => {
		if (posts) {
			return posts;
		} else {
			const error: Array<Error> = [new Error('There are no posts')];
			throw error;
		}
	});
}
