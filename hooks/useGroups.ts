import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Group, Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'

export const useGroups = () => {
	const [status, setStatus] = useState<Status>('init')

	const [groups, setGroups] = useState([] as Group[])
	const { user } = useTypedSelector(state => state.user)

	useEffect(() => {
		setStatus('loading')
		const subscriber = firestore()
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

				setGroups(list)
				setStatus('success')
			})

		return () => subscriber()
	}, [user])

	return {
		status,
		groups,
	}
}
