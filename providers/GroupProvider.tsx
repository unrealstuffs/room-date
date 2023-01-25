import { ReactNode, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Group, Note } from '../constants/Types'
import fromTimestampToDate from '../utils/fromTimestampToDate'

const GroupProvider = ({ children }: { children: ReactNode }) => {
	const { setDataGroups, setDataNotes, setDataGroup, setDataNote } =
		useActions()
	const { groupId, noteId } = useTypedSelector(state => state.group)
	const { user } = useTypedSelector(state => state.user)

	useEffect(() => {
		firestore()
			.collection('groups')
			.where('members', 'array-contains', user?.uid)
			.onSnapshot(querySnapshot => {
				const list: any = []
				querySnapshot.forEach(doc => {
					const data = doc.data()
					list.push({
						id: doc.id,
						...data,
					})
				})

				setDataGroups(list)
			})
	}, [user])

	useEffect(() => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data() as Group
					setDataGroup(data)
				}
			})
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.onSnapshot(querySnapshot => {
				const list: any = []
				querySnapshot.forEach(doc => {
					const data = doc.data() as Note & {
						createdAt: { seconds: number; nanoseconds: number }
					}
					list.push({
						...data,
						id: doc.id,
						createdAt: fromTimestampToDate(data.createdAt),
					})
				})

				setDataNotes(list)
			})
	}, [groupId])

	useEffect(() => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.collection('notes')
			.doc(noteId)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data() as Note & {
						createdAt: { seconds: number; nanoseconds: number }
					}
					setDataNote({
						...data,
						id: documentSnapshot.id,
						createdAt: fromTimestampToDate(data.createdAt),
					})
				}
			})
	}, [noteId])

	return <>{children}</>
}

export default GroupProvider
