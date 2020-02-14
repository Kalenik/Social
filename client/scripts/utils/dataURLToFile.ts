import blobToFile from './blobToFile';
import dataURLtoBlob from './dataURLtoBlob';

export default function dataURLToFile(dataURL: string) {
	return blobToFile(dataURLtoBlob(dataURL));
}
