import Config from '@config';
import processJSON from '@services/HttpService/base/processJSON';
import baseDelete from '@services/HttpService/baseMethods/baseDelete';

export default function deleteAvatar(token: string) {
	return baseDelete(Config.host + '/file/delete', {}, token)
		.then(processJSON)
		.then(isDeleted => {
			if (isDeleted) {
				return isDeleted;
			} else {
				const error: Array<Error> = [
					new Error('Delete Avatar is failed')
				];
				throw error;
			}
		});
}
