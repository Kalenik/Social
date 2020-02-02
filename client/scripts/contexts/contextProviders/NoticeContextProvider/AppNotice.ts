export type NoticeType = 'error' | 'success' | 'info';

export default class AppNotice {
	constructor(public message: string, public type: NoticeType = 'info') {}
}
