import firestore from '@react-native-firebase/firestore'

export const fetchRooms = async () => {
	return await firestore().collection('rooms').get()
}
