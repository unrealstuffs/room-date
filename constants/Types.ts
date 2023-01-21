export interface Group {
	id: string
	title: string
	inviteCode: string
	members: string[]
	notes: Note[]
	theme: 'classic' | 'nature' | 'love'
}

export interface Note {
	id: string
	groupId: string
	title: string
	description: string
	createdAt: Date
	date: Date
	pinned: boolean
}

export interface User {
	uid: string
	displayName: string
	photoURL: string
}

export interface CreateNote {
	title: string
	date?: Date | null
	description: string
}

export type UpdateNote = Pick<Note, 'id' | 'title' | 'date' | 'description'>

export interface UpdateGroup {
	title: string
	theme: string
}

export type Status = 'init' | 'loading' | 'error' | 'success'
