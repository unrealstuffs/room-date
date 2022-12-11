import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import auth from '@react-native-firebase/auth'
import { ModalStackParams } from '../../App'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Avatar from '../parts/Avatar'
import Themes from '../../constants/Themes'

const UserModal = ({
	modal: { closeModal },
}: ModalComponentProp<ModalStackParams, void, 'UserModal'>) => {
	const { width } = useWindowDimensions()
	const { setUser } = useActions()
	const { user } = useTypedSelector(state => state.user)
	const [loading, setLoading] = useState(false)

	const googleSignOut = async () => {
		setLoading(true)
		auth()
			.signOut()
			.then(() => {
				setLoading(false)
				closeModal()
				setUser(null)
			})
			.catch(err => console.log(err))
	}

	return (
		<View style={[styles.modal, { width: width * 0.85 }]}>
			<View style={styles.header}>
				<View style={styles.user}>
					<Avatar size={45} uri={user?.photoURL} />
					<Text style={styles.name}>
						{user ? user.displayName : 'Не доступно'}
					</Text>
				</View>
				<AntDesign
					onPress={() => closeModal()}
					name='close'
					size={20}
				/>
			</View>
			<View>
				<TouchableOpacity
					activeOpacity={0.6}
					disabled={loading}
					style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
					onPress={googleSignOut}
				>
					<Text style={styles.textButton}>
						{loading ? (
							<ActivityIndicator color='#fff' />
						) : (
							'Выйти из аккаунта'
						)}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default UserModal

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	user: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: {
		marginLeft: 10,
	},
	button: {
		padding: 10,
		backgroundColor: Themes.light.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	textButton: {
		color: '#fff',
	},
})
