/**
 * Regex util, containing all the necessary regular expressions.
 */
class RegexUtils {
	specialChar = /[\\/=?`<>]/

	email = /^([a-z0-9.\-_]+@[a-z0-9]+(\.[a-z]+)?\.[a-z]+)$/i

	emptyField = /^\s*$/

	whiteSpace = /^\s/

	contactNumber = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

	password = /^(?=.*\d).{8,}$/

	regexNumber = /^[0-9]*$/

	floatNumber = /^(\d*\.)?\d+$/gim

	url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

	fileName = /[\\/=`<>]/

	image = /\.(jpeg|jpg|png|gif)$/i
}

export default new RegexUtils()
