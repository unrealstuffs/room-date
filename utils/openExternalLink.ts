import { Linking } from 'react-native'
import showToast from './showToast'

const openExternalLink = async (url: string) => {
	const supported = await Linking.canOpenURL(url)

	if (supported) {
		await Linking.openURL(url)
	} else {
		showToast('Не удается открыть ссылку...')
	}
}

export default openExternalLink
