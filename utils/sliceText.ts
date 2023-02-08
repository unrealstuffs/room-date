const sliceText = (text: string, limit: number = 80) => {
	text = text.trim()
	if (text.length <= limit) return text

	text = text.slice(0, limit)

	return text.trim() + '...'
}

export default sliceText
