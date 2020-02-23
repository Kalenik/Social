import Config from '@config';
import postJSON from '@services/HttpService/jsonMethods/postJSON';

export default function uploadAvatar(token: string, avatarImgDataURL: string) {
	const options = {
		body: JSON.stringify({ avatarImgDataURL: avatarImgDataURL })
	};

	return postJSON(Config.host + '/avatar/upload', options, token).then(
		({ profileImgSrc }) => {
			if (profileImgSrc) {
				return profileImgSrc;
			} else {
				const error: Array<Error> = [
					new Error('Upload Avatar is failed')
				];
				throw error;
			}
		}
	);
}
