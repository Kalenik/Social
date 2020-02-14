import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function editUser(
	token: string,
	username: string,
	email: string,
	city?: string,
	extraInfo?: string,
	newPassword?: string,
	currentPassword?: string
) {
	const requestBody: IRequestBody = {
		query: `
            mutation EditUser($username:String!, $email: String!, $city: String, $extraInfo: String, $newPassword: String, $currentPassword: String ) {
                editUser(editUserInput: {username: $username, email: $email, city: $city, extraInfo: $extraInfo, newPassword: $newPassword, currentPassword: $currentPassword}) {
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
			username,
			email,
			city,
			extraInfo,
			newPassword,
			currentPassword
		}
	};

	const options = {
		body: JSON.stringify(requestBody)
	};

	return postJSON(Config.graphqlPath, options, token).then(
		({ data: { editUser } }) => {
			if (editUser) {
				return editUser;
			} else {
				const error: Array<Error> = [new Error('Edit User is failed')];
				throw error;
			}
		}
	);
}
