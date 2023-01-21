import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { CreateNote, Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'

export const useNotes = () => {
	const [status, setStatus] = useState<Status>('init')
	const { groupId } = useTypedSelector(state => state.group)

	const createNote = (data: CreateNote) => {
		setStatus('loading')

		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.add({
				createdAt: firestore.FieldValue.serverTimestamp(),
				title: data.title,
				description: data.description,
				date: data.date || null,
				pinned: false,
			})
			.then(() => {
				setStatus('success')
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const updateNote = (
		noteId: string,
		title: string,
		date: Date,
		description: string
	) => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.doc(noteId)
			.update({ title, date, description })
	}

	const pinNote = (noteId: string, pinned: boolean) => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.doc(noteId)
			.update({ pinned })
	}

	const deleteNote = (noteId: string) => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.doc(noteId)
			.delete()
	}

	return { status, pinNote, deleteNote, updateNote, createNote }
}
