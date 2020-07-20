import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * @description Instance of notification message to handle dismiss/success/error/warning operation of toast notification
 * @class Notification
 */

toast.configure({
	autoClose: 3000,
	position: 'top-right',
	transition: Slide,
	className: 'toast-notification',
})

type MessageType = {
	message: string
	autoClose?: number
}

class Notification {
	/**
	 * @param {String} message Type of message in the toast notification
	 * @param {Number} autoClose milliseconds in which toast should close
	 */
	toastMsg: string | number | undefined

	success = ({ message, autoClose }: MessageType) => {
		toast.dismiss(this.toastMsg)
		this.toastMsg = toast.success(message, {
			autoClose: autoClose || 3000,
			draggable: false,
		})
	}

	error = ({ message, autoClose }: MessageType) => {
		toast.dismiss(this.toastMsg)
		this.toastMsg = toast.error(message, {
			autoClose: autoClose || false,
			draggable: false,
		})
	}

	warning = ({ message, autoClose }: MessageType) => {
		toast.dismiss(this.toastMsg)
		this.toastMsg = toast.warn(message, {
			autoClose: autoClose || 3000,
			draggable: false,
		})
	}

	dismiss = () => toast.dismiss(this.toastMsg)
}

export default new Notification()
