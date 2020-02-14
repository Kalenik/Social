import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchUsers(exceptUserId?: string) {
	const requestBody: IRequestBody = {
		query: `
            query Users ($id:ID) {
                users(exceptUserId: $id) {
                    _id
                    username
                    email
                    profileImgSrc
                }
            }
        `,
		variables: {
			id: exceptUserId
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options).then(({ data: { users } }) => {
		if (users) {
			return users;
		} else {
			const error: Array<Error> = [new Error('There are no users')];
			throw error;
		}
	});
}
