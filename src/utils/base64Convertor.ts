/**
 * conver a user selected file to base64
 *
 * @param file - bolb file object
 */
export default async (file: Blob) => {
	try {
		const dataUrl = await new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result)
			reader.readAsDataURL(file)
			reader.onerror = reject
		})
		return dataUrl
	} catch (error) {
		console.error(error)
		return error
	}
}
