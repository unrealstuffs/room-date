const fromTimestampToDate = (date: {
	seconds: number
	nanoseconds: number
}) => {
	if (date && date.seconds && date.nanoseconds) {
		return new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
	} else {
		return null
	}
}

export default fromTimestampToDate
