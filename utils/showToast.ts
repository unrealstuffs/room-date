import { ToastAndroid } from 'react-native'

const showToast = (message: string) => {
	ToastAndroid.show(message, ToastAndroid.SHORT)
}

export default showToast
