export default function getTimeOrDateString(date: string): string {
	const receivedDate = new Date(+date);

	return receivedDate.toLocaleDateString() === new Date().toLocaleDateString()
		? receivedDate.toLocaleTimeString()
		: receivedDate.toLocaleDateString();
}
