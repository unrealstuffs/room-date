import * as Clipboard from 'expo-clipboard'

const copyToClipboard = async (text: string) => {
	await Clipboard.setStringAsync(text)
}

export default copyToClipboard
