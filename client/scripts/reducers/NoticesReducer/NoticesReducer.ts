import AppNotice, {
	NoticeType
} from '@contexts/contextProviders/NoticeContextProvider/AppNotice';

export type noticesReducerActionType =
	| { type: 'AddNotices'; newNotices: Array<AppNotice> }
	| { type: 'DeleteNotice'; noticeForDelete: AppNotice };

const addNotices = (
	prevNotices: Array<AppNotice>,
	newNotices: Array<AppNotice>
): Array<AppNotice> => {
	const resultNotiseList: Array<AppNotice> = [],
		noticeMessages: { [key: string]: NoticeType } = {};

	[...prevNotices, ...newNotices].forEach(({ message, type }) => {
		// Notices can have the same message only if they have different type
		if (!noticeMessages[message] || noticeMessages[message] !== type) {
			noticeMessages[message] = type;
			resultNotiseList.push({ message, type });
		}
	});

	return resultNotiseList;
};

const deleteNotice = (
	prevNotices: Array<AppNotice>,
	{ type, message }: AppNotice
): Array<AppNotice> =>
	prevNotices.filter(notice =>
		notice.type === type ? notice.message !== message : true
	);

const noticesReducer = (
	state: Array<AppNotice>,
	action: noticesReducerActionType
) => {
	switch (action.type) {
		case 'AddNotices':
			return addNotices(state, action.newNotices);
		case 'DeleteNotice':
			return deleteNotice(state, action.noticeForDelete);
		default:
			return state;
	}
};

export default noticesReducer;
