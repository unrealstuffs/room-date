import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import { Status } from '../constants/Types'
import { generateInviteCode } from '../utils/generateInviteCode'
import { useTypedSelector } from './useTypedSelector'

export const useCreateGroup = () => {
	const [status, setStatus] = useState<Status>('init')
	const [inviteCode, setInviteCode] = useState('')
	const { user } = useTypedSelector(state => state.user)

	const createGroup = (title: string) => {
		const inviteCode = generateInviteCode()
		setStatus('loading')

		firestore()
			.collection('groups')
			.add({
				title,
				inviteCode,
				members: [user.uid],
				theme: 'classic',
			})
			.then(() => {
				setInviteCode(inviteCode)
				setStatus('success')
			})
			.catch(() => {
				setStatus('error')
			})
	}

	return { status, inviteCode, createGroup }
}
