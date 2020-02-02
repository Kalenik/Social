import AppNotice from '@contexts/contextProviders/NoticeContextProvider/AppNotice';
import { noticesReducerActionType } from './NoticesReducer';

export const addSuccessNoticesActionCreator = (
	...messages: Array<string>
): noticesReducerActionType => ({
	type: 'AddNotices',
	newNotices: messages.map(message => new AppNotice(message, 'success'))
});

export const addErrorNoticesActionCreator = (
	errors: Array<Error>
): noticesReducerActionType => {
	return {
		type: 'AddNotices',
		newNotices: Array.isArray(errors)
			? errors.map(error => new AppNotice(error.message, 'error'))
			: [new AppNotice('Application Error', 'error')]
	};
};

export const deleteNoticeActionCreator = (
	notice: AppNotice
): noticesReducerActionType => ({
	type: 'DeleteNotice',
	noticeForDelete: notice
});
