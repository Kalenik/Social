import dateToNumber from './dateToNumber';
import getTimeOrDateString from './getTimeOrDateString';

export default function getCreatedOrUpdatedDateString(
	createdDate: string,
	updatedDate: string
): string {
	return dateToNumber(updatedDate) > dateToNumber(createdDate)
		? `Updated: ${getTimeOrDateString(updatedDate)}`
		: `Created: ${getTimeOrDateString(createdDate)}`;
}
