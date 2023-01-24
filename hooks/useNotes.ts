import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { CreateNote, Note, Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'

export const useNotes = () => {
	const [status, setStatus] = useState<Status>('init')
	const { groupId } = useTypedSelector(state => state.group)

	const createNote = (data: Pick<Note, 'title' | 'description'>) => {
		setStatus('loading')

		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.add({
				createdAt: firestore.FieldValue.serverTimestamp(),
				title: data.title,
				description: data.description,
				pinned: false,
			})
			.then(() => {
				setStatus('success')
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const updateNote = (data: Pick<Note, 'id' | 'title' | 'description'>) => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.doc(data.id)
			.update({ ...data })
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
