import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'
import { useActions } from './useActions'

export const useUpdateProfile = () => {
	const [status, setStatus] = useState<Status>('init')
	const { user } = useTypedSelector(state => state.user)
	const { setUser } = useActions()

	const updateProfile = async ({ displayName }: { displayName: string }) => {
		try {
			setStatus('loading')
			await firestore()
				.collection('users')
				.doc(user.uid)
				.update({ displayName })
			setStatus('success')
			setUser({ ...user, displayName })
		} catch (error) {
			console.error(error)
		}
	}

	return { updateProfile, status }
}
