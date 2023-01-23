import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Status, User } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'

export const useMembers = () => {
	const [status, setStatus] = useState<Status>('init')
	const [members, setMembers] = useState([] as User[])
	const { group } = useTypedSelector(state => state.data)

	useEffect(() => {
		setStatus('loading')
		if (group?.members) {
			const subscriber = firestore()
				.collection('users')
				.where(firestore.FieldPath.documentId(), 'in', group?.members)
				.onSnapshot(querySnapshot => {
					const list: any = []
					querySnapshot.forEach(doc => {
						const data = doc.data()
						list.push({
							uid: doc.id,
							...data,
						})
					})

					setMembers(list)
					setStatus('success')
				})
			return () => subscriber()
		}
	}, [group])

	return { status, members, setMembers }
}
