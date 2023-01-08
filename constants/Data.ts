type Themes = 'nature' | 'classic' | 'love'
type Categories = 'friends' | 'couple'
type EventTypes = 'date' | 'event' | 'note'

export interface RoomTypes {
	id: string
	title?: string
	inviteCode?: string
	category?: string
	members?: string[]
	events?: string[]
	theme?: Themes
}

export interface Events {
	id: string
	roomId: string
	title: string
	description: string
	type: EventTypes
	date: {
		seconds: number
		nanoseconds: number
	}
	pinned: boolean
}

export interface Members {
	id: string
	name: string
	photoURL: string
	roomIds: string[]
}
