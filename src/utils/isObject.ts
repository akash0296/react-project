/**
 * util to check whether a variable is a object or not
 * @param item variable to check for object
 */
export default function isObject(item: any) {
	return typeof item === 'object' && !Array.isArray(item) && item !== null
}
