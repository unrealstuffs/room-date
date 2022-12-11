type Themes = 'dark' | 'light'
type Categories = 'friends' | 'couple'
type EventTypes = 'date' | 'event'

export interface Rooms {
	id: string
	title: string
	inviteID: string
	category: Categories
	members: string[]
	events: string[]
	theme: Themes
}

export interface Events {
	id: string
	roomID: string
	title: string
	type: EventTypes
	startDate: Date
	endDate: Date
	pinned: boolean
}

export interface Members {
	id: string
	name: string
	photoURL: string
	color: string
	roomIDs: string[]
}

export const rooms: Rooms[] = [
	{
		id: '123wer345rty',
		title: 'Pizda',
		inviteID: '12442356676',
		category: 'friends',
		members: ['123', '124'],
		events: ['345', '456'],
		theme: 'dark',
	},
	{
		id: '123wer3rrry',
		title: 'Room',
		inviteID: '12442356676',
		category: 'friends',
		members: ['123', '124'],
		events: ['345', '456'],
		theme: 'dark',
	},
]

export const events: Events[] = [
	{
		id: '345',
		roomID: '123wer345rty',
		title: 'aboba',
		type: 'date',
		startDate: new Date(),
		endDate: new Date(),
		pinned: true,
	},
]

export const members: Members[] = [
	{
		id: '999',
		name: 'Vitalik',
		photoURL: 'https://google.com',
		color: '#35efef',
		roomIDs: ['123wer345rty'],
	},
]
