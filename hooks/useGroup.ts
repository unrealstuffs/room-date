import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Group, Note, Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'
import fromTimestampToDate from '../utils/fromTimestampToDate'

export const useGroup = () => {
	const [status, setStatus] = useState<Status>('init')
	const [group, setGroup] = useState({} as Group)
	const [notes, setNotes] = useState({} as Note[])
	const { groupId } = useTypedSelector(state => state.group)

	useEffect(() => {
		firestore()
			.collection('groups')
			.doc(groupId)
			.onSnapshot(documentSnapshot => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data() as Group
					setGroup(data)
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

				setNotes(list)
				setStatus('success')
			})
	}, [groupId])

	return { status, group, notes }
}
