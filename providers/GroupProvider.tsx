import { ReactNode, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Group, Note } from '../constants/Types'
import fromTimestampToDate from '../utils/fromTimestampToDate'
import { ThemeProvider } from 'styled-components/native'
import themes from '../themes'

const GroupProvider = ({ children }: { children: ReactNode }) => {
	const { setDataGroups, setDataNotes, setDataGroup, setDataNote } =
		useActions()
	const { groupId, noteId } = useTypedSelector(state => state.group)
	const { group } = useTypedSelector(state => state.data)
	const { user } = useTypedSelector(state => state.user)

	useEffect(() => {
		if (user) {
			const groupsRef = firestore()
				.collection('groups')
				.where('members', 'array-contains', user.uid)

			groupsRef.onSnapshot(querySnapshot => {
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
		}
	}, [user])

	useEffect(() => {
		if (user) {
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
						const data = doc.data() as Note
						list.push({
							...data,
							id: doc.id,
						})
					})

					setDataNotes(list)
				})
		}
	}, [groupId])

	useEffect(() => {
		if (user) {
			firestore()
				.collection('groups')
				.doc(groupId)
				.collection('notes')
				.doc(noteId)
				.onSnapshot(documentSnapshot => {
					if (documentSnapshot.exists) {
						const data = documentSnapshot.data() as Note
						setDataNote({
							...data,
							id: documentSnapshot.id,
						})
					}
				})
		}
	}, [noteId])

	return (
		<ThemeProvider theme={themes[group.theme] || themes.classic}>
			{children}
		</ThemeProvider>
	)
}

export default GroupProvider
