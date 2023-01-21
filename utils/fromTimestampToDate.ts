const fromTimestampToDate = (
	date: {
		seconds: number
		nanoseconds: number
	} | null
) => {
	return date
		? new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
		: null
}

export default fromTimestampToDate
