export const generateInviteCode = () => {
	let result = ''
	const characters = '0123456789'
	const charactersLength = characters.length
	for (let i = 1; i <= 12; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
		if (i === 3 || i === 6 || i === 9) result += '-'
	}
	return result
}
