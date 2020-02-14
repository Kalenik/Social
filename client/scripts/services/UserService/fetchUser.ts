import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function fetchUser(userName: string) {
	const requestBody: IRequestBody = {
		query: `
            query User($userName:String!) {
                user(userName:$userName) {
                    _id
                    username
                    email
                    city
                    extraInfo
                    profileImgSrc
                    friends {
                        _id
                    }
                    following {
                        _id
                    }
                    followers {
                        _id
                    }
                    createdPosts {
                        _id
                        title
                        text
                        created
                        updated
                        creator {
                            _id
                        }
                    }
                }
            }
        `,
		variables: {
			userName
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options).then(({ data: { user } }) => {
		if (user) {
			return user;
		} else {
			const error: Array<Error> = [new Error('User not found')];
			throw error;
		}
	});
}
