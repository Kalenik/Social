export default function blobToFile(file: Blob, fileName: string = 'file') {
	return new File([file], `${fileName}.${file.type.split('/').pop()}`, {
		type: file.type
	});
}
