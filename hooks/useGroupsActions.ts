import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Status } from '../constants/Types'
import { useTypedSelector } from './useTypedSelector'
import { useNavigation } from '@react-navigation/native'
import showToast from '../utils/showToast'
import { useActions } from './useActions'

export const useGroupsActions = () => {
	const [status, setStatus] = useState<Status>('init')
	const navigation = useNavigation()
	const { user } = useTypedSelector(state => state.user)
	const { groupId } = useTypedSelector(state => state.group)
	const { setGroupId } = useActions()

	const joinGroup = (inviteCode: string) => {
		setStatus('loading')
		firestore()
			.collection('groups')
			.where('inviteCode', '==', inviteCode)
			.get()
			.then(data => {
				if (data.empty) {
					setStatus('error')
					return
				}
				firestore()
					.collection('groups')
					.doc(data.docs[0].id)
					.update({
						members: firestore.FieldValue.arrayUnion(user?.uid),
					})
					.then(() => {
						setStatus('success')
						setGroupId(data.docs[0].id)
						navigation.navigate('Group')
					})
					.catch(() => {
						setStatus('error')
					})
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const updateGroup = ({ title }: { title: string }) => {
		setStatus('loading')
		firestore()
			.collection('groups')
			.doc(groupId)
			.update({
				title,
			})
			.then(() => {
				setStatus('success')
				showToast(`Группа обновлена!`)
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const updateTheme = (theme: string) => {
		setStatus('loading')
		firestore()
			.collection('groups')
			.doc(groupId)
			.update({
				theme,
			})
			.then(() => {
				setStatus('success')
				showToast('Тема группы изменена!')
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const exitGroup = (userId: string) => {
		setStatus('loading')
		firestore()
			.collection('groups')
			.doc(groupId)
			.update({
				members: firestore.FieldValue.arrayRemove(userId),
			})
			.then(() => {
				setStatus('success')
				if (user?.uid === userId) {
					navigation.navigate('Root')
					showToast(`Вы вышли из группы`)
				} else {
					showToast(`Участник удален из группы`)
				}
			})
			.catch(() => {
				setStatus('error')
			})
	}

	const deleteGroup = () => {
		setStatus('loading')
		firestore()
			.collection('groups')
			.doc(groupId)
			.delete()
			.then(() => {
				setStatus('success')
				navigation.navigate('Root')
				showToast(`Группа удалена!`)
			})
			.catch(() => {
				setStatus('error')
			})
	}

	return {
		status,
		joinGroup,
		updateGroup,
		exitGroup,
		deleteGroup,
		updateTheme,
	}
}
