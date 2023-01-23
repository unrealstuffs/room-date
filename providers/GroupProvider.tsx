import { ReactNode, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Group, Note } from '../constants/Types'
import fromTimestampToDate from '../utils/fromTimestampToDate'

const GroupProvider = ({ children }: { children: ReactNode }) => {
	const { setDataGroups, setDataNotes } = useActions()
	const { groupId } = useTypedSelector(state => state.group)

	useEffect(() => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.onSnapshot(documentSnapshot => {
				console.log('aaaa')
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data() as Group
					setDataGroups(data)
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
						date: { seconds: number; nanoseconds: number }
						createdAt: { seconds: number; nanoseconds: number }
					}
					list.push({
						...data,
						id: doc.id,
						createdAt: fromTimestampToDate(data.createdAt),
						date: fromTimestampToDate(data.date),
					})
				})

				setDataNotes(list)
			})
	}, [groupId])

	return <>{children}</>
}

export default GroupProvider
