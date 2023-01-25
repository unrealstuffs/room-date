const fromTimestampToDate = (date: {
	seconds: number
	nanoseconds: number
}) => {
	return new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
}

export default fromTimestampToDate
