const baseRequestBody = `
		user {
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
		accessToken
		tokenExpiration
`;

export default baseRequestBody;
