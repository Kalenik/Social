import IRequestBody from '@interfaces/IRequestBody';
import baseAuthRequest from './base/baseAuthRequest';
import baseRequestBody from './base/baseRequestBody';

export default function refreshTokens() {
	const requestBody: IRequestBody = {
		query: `
            mutation {
                refreshTokens {
                    ${baseRequestBody}
                }
            }
        `
	};

	return baseAuthRequest('refreshTokens', requestBody);
}
