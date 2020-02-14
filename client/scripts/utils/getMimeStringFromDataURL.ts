export default function getMimeStringFromDataURL(dataURL: string) {
	return dataURL
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];
}
