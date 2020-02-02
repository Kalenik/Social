import AppNotice, {
	NoticeType
} from '@contexts/contextProviders/NoticeContextProvider/AppNotice';

export type noticesReducerActionType =
	| { type: 'AddNotices'; newNotices: Array<AppNotice> }
	| { type: 'DeleteNotice'; noticeForDelete: AppNotice };

type noticesReducerStateType = {
	notices: Array<AppNotice>;
};

const addNotices = (
	prevNotices: Array<AppNotice>,
	newNotices: Array<AppNotice>
): Array<AppNotice> => {
	const resultNotiseList: Array<AppNotice> = [],
		noticeMessages: { [key: string]: NoticeType } = {};

	[...prevNotices, ...newNotices].forEach(notice => {
		// Notices can have the same message only if they have different type
		if (
			!noticeMessages[notice.message] ||
			noticeMessages[notice.message] !== notice.type
		) {
			noticeMessages[notice.message] = notice.type;

			resultNotiseList.push(notice);
		}
	});

	return resultNotiseList;
};

const deleteNoticeActionCreator = (
	prevNotices: Array<AppNotice>,
	{ type, message }: AppNotice
): Array<AppNotice> =>
	prevNotices.filter(notice =>
		notice.type === type ? notice.message !== message : true
	);

const noticesReducer = (
	state: noticesReducerStateType,
	action: noticesReducerActionType
) => {
	switch (action.type) {
		case 'AddNotices':
			return {
				...state,
				notices: addNotices(state.notices, action.newNotices)
			};
		case 'DeleteNotice':
			return {
				...state,
				notices: deleteNoticeActionCreator(
					state.notices,
					action.noticeForDelete
				)
			};
		default:
			return state;
	}
};

export default noticesReducer;
