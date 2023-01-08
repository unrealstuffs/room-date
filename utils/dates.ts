import dayjs from 'dayjs'

interface InitialDate {
	seconds: number
	nanoseconds: number
}

class DateConverter {
	private date: Date

	constructor(initialDate: InitialDate) {
		this.date = new Date(
			initialDate.seconds * 1000 + initialDate.nanoseconds / 1000000
		)
	}

	public get getDate() {
		return dayjs(this.date).format('DD/MM/YYYY')
	}

	public getPercentage() {
		const startOfDate = dayjs(new Date()),
			endDate = dayjs(this.date),
			todayDate = dayjs()

		const daysDifference = dayjs(endDate).diff(startOfDate, 'days')
		const difference = todayDate.diff(startOfDate, 'days')

		const result = Math.round((difference / daysDifference) * 100)

		return result
	}
}

export default DateConverter
