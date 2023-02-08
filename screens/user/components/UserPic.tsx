import firestore from '@react-native-firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import showToast from '../../../utils/showToast'
import { useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Avatar from '../../../components/parts/Avatar'
import { useActions } from '../../../hooks/useActions'

const UserPic = () => {
	const { user } = useTypedSelector(state => state.user)
	const { setUser } = useActions()
	const [image, setImage] = useState<string | null>(user.photoURL || null)

	const pickImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== 'granted') {
			showToast('Извините, для выбора фото нужен доступ к камере!')
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			allowsMultipleSelection: false,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})
		if (result.assets) {
			uploadImage(result.assets[0].uri)
		}
	}

	const uploadImage = async (uri: string) => {
		try {
			const ref = storage().ref().child(`users/${user.uid}/photo`)
			await ref.putFile(uri)
			const photoURL = await ref.getDownloadURL()
			firestore().collection('users').doc(user.uid).update({ photoURL })
			setImage(photoURL)
			setUser({ ...user, photoURL })
			showToast('Фотография загружена!')
		} catch (error) {
			showToast('Ошибка при загрузке фото')
		}
	}

	return (
		<>
			<Avatar
				size={100}
				uri={image!}
				name={user.displayName || 'Нет данных'}
				onPress={pickImage}
			/>
		</>
	)
}

export default UserPic
