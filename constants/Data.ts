export const rooms = [
	{
		id: '123wer345rty',
		inviteID: '12442356676',
		category: 'friends',
		members: ['123', '124'],
		events: ['345', '456'],
		theme: 'dark',
	},
]

export const events = [
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

export const members = [
	{
		id: '999',
		name: 'Vitalik',
		photoURL: 'https://google.com',
		color: '#35efef',
		roomIDs: ['123wer345rty'],
	},
]
