export default function shortenText(text: string, maxLength: number): string {
	return text.length > maxLength
		? text.slice(0, maxLength - 1) + '...'
		: text;
}
