export default function isEmptyObject(obj: {}) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return JSON.stringify(obj) === JSON.stringify({});
}
