import getMimeStringFromDataURL from './getMimeStringFromDataURL';

export default function dataURLtoBlob(dataURL: string) {
	const mimeString = getMimeStringFromDataURL(dataURL),
		byteString = atob(dataURL.split(',')[1]),
		n = byteString.length,
		ab = new ArrayBuffer(n),
		u8arr = new Uint8Array(ab);

	for (let i = 0; i < n; i++) {
		u8arr[i] = byteString.charCodeAt(i);
	}

	return new Blob([ab], { type: mimeString });
}
