type Themes = 'nature' | 'classic' | 'love'
type Categories = 'friends' | 'couple'
type EventTypes = 'date' | 'event' | 'note'

export interface Rooms {
	id: string
	title: string
	inviteCode: string
	category: Categories
	members: string[]
	events: string[]
	theme: Themes
}

export interface Events {
	id: string
	roomId: string
	title: string
	description: string
	type: EventTypes
	start_date: string
	end_date: string
	pinned: boolean
}

export interface Members {
	id: string
	name: string
	photoURL: string
	roomIds: string[]
}

export const rooms: Rooms[] = [
	{
		id: '1',
		title: 'JUGLANS NIGRA POLLEN',
		inviteCode: '87-714-4240',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'classic',
	},
	{
		id: '2',
		title: 'Xyzal',
		inviteCode: '90-001-1121',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'nature',
	},
	{
		id: '3',
		title: 'Diltiazem Hydrochloride',
		inviteCode: '19-944-5936',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'classic',
	},
	{
		id: '4',
		title: 'APIS MELLIFICA',
		inviteCode: '39-452-7528',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'love',
	},
	{
		id: '5',
		title: 'ZYLOPRIM',
		inviteCode: '79-589-6906',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'love',
	},
	{
		id: '6',
		title: 'HEADACHE STIFF NECK',
		inviteCode: '38-168-1629',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'classic',
	},
	{
		id: '7',
		title: 'OXYGEN',
		inviteCode: '37-388-1015',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'nature',
	},
	{
		id: '8',
		title: 'Topcare Milk of Magnesia',
		inviteCode: '14-928-8043',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'love',
	},
	{
		id: '9',
		title: 'Ibuprofen',
		inviteCode: '14-015-8468',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'classic',
	},
	{
		id: '10',
		title: 'NATURAL SUN AQ SUPER PERFECT SUN',
		inviteCode: '61-264-3315',
		category: 'friends',
		members: ['1', '2', '3'],
		events: ['1', '2', '3'],
		theme: 'nature',
	},
]

export const events: Events[] = [
	{
		id: '1',
		roomId: '1',
		title: "Ranunculus marginatus d'Urv.",
		description:
			'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
		type: 'date',
		start_date: '2/12/2022',
		end_date: '1/17/2023',
		pinned: true,
	},
	{
		id: '2',
		roomId: '2',
		title: 'Sclerocactus brevispinus K.D. Heil & J.M. Porter',
		description: 'In hac habitasse platea dictumst.',
		type: 'date',
		start_date: '7/1/2022',
		end_date: '1/7/2023',
		pinned: true,
	},
	{
		id: '3',
		roomId: '3',
		title: 'Solidago altissima L.',
		description:
			'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
		type: 'event',
		start_date: '7/1/2022',
		end_date: '1/16/2023',
		pinned: false,
	},
	{
		id: '4',
		roomId: '4',
		title: 'Geranium caespitosum James var. eremophilum (Wooton & Standl.) W.C. Martin & C.R. Hutchins',
		description:
			'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
		type: 'event',
		start_date: '10/1/2022',
		end_date: '9/24/2023',
		pinned: true,
	},
	{
		id: '5',
		roomId: '5',
		title: 'Cephalotaxus Siebold & Zucc. ex Endl.',
		description:
			'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
		type: 'note',
		start_date: '4/9/2022',
		end_date: '7/15/2023',
		pinned: false,
	},
	{
		id: '6',
		roomId: '6',
		title: 'Gilia capitata Sims ssp. staminea (Greene) V.E. Grant',
		description:
			'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.',
		type: 'note',
		start_date: '10/18/2022',
		end_date: '6/9/2023',
		pinned: false,
	},
	{
		id: '7',
		roomId: '7',
		title: 'Galenia pubescens (Eckl. & Zeyh.) Druce',
		description:
			'Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.',
		type: 'event',
		start_date: '5/14/2022',
		end_date: '7/13/2023',
		pinned: true,
	},
	{
		id: '8',
		roomId: '8',
		title: 'Amelanchier stolonifera Wiegand',
		description:
			'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',
		type: 'date',
		start_date: '10/29/2022',
		end_date: '2/10/2023',
		pinned: false,
	},
	{
		id: '9',
		roomId: '9',
		title: 'Luetkea Bong.',
		description:
			'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
		type: 'date',
		start_date: '4/8/2022',
		end_date: '7/23/2023',
		pinned: true,
	},
	{
		id: '10',
		roomId: '10',
		title: 'Rosa nutkana C. Presl',
		description:
			'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.',
		type: 'event',
		start_date: '5/29/2022',
		end_date: '12/12/2023',
		pinned: false,
	},
]

export const members: Members[] = [
	{
		id: '1',
		name: 'Ellen',
		photoURL:
			'https://robohash.org/asperioresnondignissimos.png?size=50x50&set=set1',
		roomIds: ['1', '2', '3'],
	},
	{
		id: '2',
		name: 'Billi',
		photoURL:
			'https://robohash.org/autveloccaecati.png?size=50x50&set=set1',
		roomIds: ['1', '2', '3'],
	},
	{
		id: '3',
		name: 'Lina',
		photoURL:
			'https://robohash.org/similiquererumdeleniti.png?size=50x50&set=set1',
		roomIds: ['1', '2', '3'],
	},
	{
		id: '4',
		name: 'Phaedra',
		photoURL: 'https://robohash.org/eosducimusquos.png?size=50x50&set=set1',
		roomIds: ['1', '2', '3'],
	},
	{
		id: '5',
		name: 'Alva',
		photoURL:
			'https://robohash.org/quisquamatatque.png?size=50x50&set=set1',
		roomIds: ['1', '2', '3'],
	},
]
