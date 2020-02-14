import Config from '@config';
import processJSON from '@services/HttpService/base/processJSON';
import basePost from '@services/HttpService/baseMethods/basePost';

export default function uploadAvatar(token: string, formData: FormData) {
	const options = {
		body: formData
	};

	return basePost(Config.host + '/file/upload', options, token)
		.then(processJSON)
		.then(({ profileImgSrc }) => {
			if (profileImgSrc) {
				return profileImgSrc;
			} else {
				const error: Array<Error> = [
					new Error('Upload Avatar is failed')
				];
				throw error;
			}
		});
}
